// API route to send push notifications
import admin from "firebase-admin";
import User from "../models/User.js"; // Adjust the path to your User model
// import { Message } from "firebase-admin/messaging";
import fs from 'fs/promises';
const serviceAccount = JSON.parse(
  await fs.readFile(new URL('../service_key.json', import.meta.url))
);
// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
import express from "express";
const router = express.Router();

// This function can be used in Express or any Node.js backend
router.post("/send-notification", async (req, res)=> {
  const { token, title, message, link } = req.body;

  const payload = {
    token,
    notification: {
      title,
      body: message,
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);
    res.status(200).json({ success: true, message: "Notification sent!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || error });
  }
})
// This function can be used in Express or any Node.js backend
router.post("/send-private-notification", async (req, res)=> {
  const { userId, title, message, link } = req.body;
  if(!userId) {
    return res.status(400).json({ success: false, error: "User ID is required" });
  }

  try {
     const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const validTokens = user.notificationTokens
      .filter(t => t.activated)
      .map(t => t.token);
    console.log("Valid tokens:", validTokens);
    if (validTokens.length === 0) {
      return res.status(400).json({ success: false, error: "No valid tokens found" });
    }
 // 3. Send to all tokens
    const sendPromises = validTokens.map(async (token) => {
      try {
        // In your API route
const payload = {
    token,
    notification: { title: title || "New Message", body: message },
    webpush: { 
        fcmOptions: { 
            link: `${link}` // Ensure leading slash for absolute path
        }
    },
    data: { // Add data fallback
        link: `${link}`
    }
};
        
        await admin.messaging().send(payload);
        return { success: true, token };
      } catch (error) {
        // Remove invalid tokens
        if (error.code === 'messaging/invalid-registration-token') {
          await User.findByIdAndUpdate(userId, {
            $pull: { notificationTokens: token }
          });
        }
        return { success: false, token, error: error.message };
      }
    });

    // 4. Wait for all sends to complete
    const results = await Promise.all(sendPromises);
    
    res.status(200).json({
      success: true,
      sentCount: results.filter(r => r.success).length,
      failedCount: results.filter(r => !r.success).length,
      results
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.post("/send-friend-request", async (req, res)=> {
  const { userId, title, message, link } = req.body;
  if(!userId) {
    return res.status(400).json({ success: false, error: "User ID is required" });
  }

  try {
     const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const validTokens = user.notificationTokens
      .filter(t => t.activated)
      .map(t => t.token);
    console.log("Valid tokens:", validTokens);
    if (validTokens.length === 0) {
      return res.status(400).json({ success: false, error: "No valid tokens found" });
    }
 // 3. Send to all tokens
    const sendPromises = validTokens.map(async (token) => {
      try {
        // In your API route
const payload = {
    token,
    notification: { title: title || "New Message", body: message },
    webpush: { 
        fcmOptions: { 
            link: `${link}` // Ensure leading slash for absolute path
        }
    },
    data: { // Add data fallback
        link: `${link}`
    }
};
        
        await admin.messaging().send(payload);
        return { success: true, token };
      } catch (error) {
        // Remove invalid tokens
        if (error.code === 'messaging/invalid-registration-token') {
          await User.findByIdAndUpdate(userId, {
            $pull: { notificationTokens: token }
          });
        }
        return { success: false, token, error: error.message };
      }
    });

    // 4. Wait for all sends to complete
    const results = await Promise.all(sendPromises);
    
    res.status(200).json({
      success: true,
      sentCount: results.filter(r => r.success).length,
      failedCount: results.filter(r => !r.success).length,
      results
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.post("/accept-friend-request", async (req, res)=> {
  const { userId, title, message, link } = req.body;
  if(!userId) {
    return res.status(400).json({ success: false, error: "User ID is required" });
  }

  try {
     const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const validTokens = user.notificationTokens
      .filter(t => t.activated)
      .map(t => t.token);
    console.log("Valid tokens:", validTokens);
    if (validTokens.length === 0) {
      return res.status(400).json({ success: false, error: "No valid tokens found" });
    }
 // 3. Send to all tokens
    const sendPromises = validTokens.map(async (token) => {
      try {
        // In your API route
const payload = {
    token,
    notification: { title: title || "New Message", body: message },
    webpush: { 
        fcmOptions: { 
            link: `${link}` // Ensure leading slash for absolute path
        }
    },
    data: { // Add data fallback
        link: `${link}`
    }
};
        
        await admin.messaging().send(payload);
        return { success: true, token };
      } catch (error) {
        // Remove invalid tokens
        if (error.code === 'messaging/invalid-registration-token') {
          await User.findByIdAndUpdate(userId, {
            $pull: { notificationTokens: token }
          });
        }
        return { success: false, token, error: error.message };
      }
    });

    // 4. Wait for all sends to complete
    const results = await Promise.all(sendPromises);
    
    res.status(200).json({
      success: true,
      sentCount: results.filter(r => r.success).length,
      failedCount: results.filter(r => !r.success).length,
      results
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
export default router;
