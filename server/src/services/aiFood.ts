import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer, { Browser, Page } from "puppeteer";
import { IUser } from "@/models/user";
import { config } from "dotenv";
import { IDailyGoal } from "@/models/dailyGoal";
config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

type ImageSource = string | null;

async function scrapeFoodiesfeed(page: Page, foodName: string) {
  try {
    const searchTerm = foodName.replace(/\s+/g, "+");
    const url = `https://www.foodiesfeed.com/?s=${searchTerm}`;
    // console.log(`Scraping Foodiesfeed for ${foodName}`);

    await page.goto(url, { waitUntil: "networkidle2" });

    let imageSources: ImageSource[] = [];
    const primarySelector = "a.getty-image-item img";
    const fallbackSelector = "li.photo-published img.wp-post-image";

    try {
      await page.waitForSelector(primarySelector, { timeout: 10000 });
      imageSources = await page.evaluate((selector) => {
        const images = Array.from(document.querySelectorAll(selector));
        return images.map((img) => img.getAttribute("src"));
      }, primarySelector);
    } catch (e) {
      console.log(
        `Primary selector ${primarySelector} not found or timeout for ${foodName}.`
      );
    }

    if (imageSources.length === 0) {
      console.log(`Trying fallback selector for ${foodName} on Foodiesfeed.`);
      try {
        await page.waitForSelector(fallbackSelector, { timeout: 7000 });
        imageSources = await page.evaluate((selector) => {
          const images = Array.from(document.querySelectorAll(selector));
          return images.map((img) => img.getAttribute("src"));
        }, fallbackSelector);
      } catch (e) {
        console.log(
          `Fallback selector ${fallbackSelector} not found or timeout for ${foodName}.`
        );
      }
    }
    return imageSources.length > 0
      ? imageSources[
          Math.floor(Math.random() * Math.min(imageSources.length, 5))
        ]
      : null;
  } catch (error: any) {
    console.error(
      `Error scraping Foodiesfeed for ${foodName} on page:`,
      error.message
    );
    return null;
  }
}

const genFoodPlan = async (user: IUser, goal?: IDailyGoal | null) => {
  let browser: Browser | null = null;
  console.time("genFoodPlan");
  try {
    browser = await puppeteer.launch({
      headless: "shell",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
      ],
    });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Generate varied and creative food recommendations for USER for breakfast, lunch, dinner, and a snack, aiming for different suggestions each time this is run.
    USER's weight is ${user.weight}kg, height is ${user.height}cm, gender is ${
      user.gender
    }, activity level is ${user.activityLevel}, health condition is ${
      user.healthCondition
    }.
    ${
      goal
        ? `USER's goal is ${goal.caloriesGoal}kcal and ${goal.proteinGoal}g of protein, ${goal.carbsGoal}g of carbs, ${goal.fatGoal}g of fat.`
        : ""
    }
    For each meal, provide the following information in a JSON-like format:
    IMPORTANT: Keep food names simple and common and not too long (e.g., "Chicken Salad", not "Grilled Chicken Breast Salad with Mixed Greens and Italian Vinaigrette"). This will help find matching images.
    Ensure the entire response is only the JSON object, with no other text before or after it.
    Do not use hyphens (-) in the food names.

{
  "breakfast": {
    "food_name": "Food Name",
    "protein": "XXg",
    "fat": "XXg",
    "carbs": "XXg",
    "calories": "XXXkcal"
  }
  // ... other meals like lunch, dinner, snack
}

The nutritional values (protein, fat, carbs, calorie) should be approximate for a standard serving.

Example structure for output (ensure all meals are included if requested):
{
  "breakfast":{
     "food_name":"Oatmeal with Berries",
      "protein":"11g",
      "fat":"13g",
      "carbs":"72g",
      "calories":"400kcal"
  },
  "lunch": {
    "food_name": "Tuna Salad Sandwich",
    "protein": "25g",
    "fat": "15g",
    "carbs": "30g",
    "calories": "350kcal"
  },
  "dinner": {
    "food_name": "Baked Cod with Asparagus",
    "protein": "30g",
    "fat": "10g",
    "carbs": "20g",
    "calories": "400kcal"
  },
  "snack": {
    "food_name": "Apple with Peanut Butter",
    "protein": "8g",
    "fat": "16g",
    "carbs": "25g",
    "calories": "280kcal"
  }
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse AI response");
    }
    const res = JSON.parse(jsonMatch[0]);

    const scrapePromises = Object.keys(res).map(async (mealType) => {
      let page: Page | null = null;
      try {
        page = await browser!.newPage();
        await page.setRequestInterception(true);
        page.on("request", (req) => {
          if (["image", "stylesheet", "font"].includes(req.resourceType())) {
            req.abort();
          } else {
            req.continue();
          }
        });

        const foodName = res[mealType].food_name;
        const imageUrl = await scrapeFoodiesfeed(page, foodName);
        return {
          ...res[mealType],
          image: imageUrl,
        };
      } catch (err: any) {
        // Added :any to err to satisfy typescript for now
        console.error(
          `Error processing ${mealType}:`,
          err.message ? err.message : err
        );
        return {
          ...res[mealType],
          image: null,
        };
      } finally {
        if (page) {
          await page.close();
        }
      }
    });

    const meals = await Promise.all(scrapePromises);
    return meals;
  } catch (error: any) {
    console.error(
      "Error generating daily goals:",
      error.message ? error.message : error
    );
    return null;
  } finally {
    console.timeEnd("genFoodPlan");
    if (browser) {
      await browser.close();
    }
  }
};

export default genFoodPlan;
