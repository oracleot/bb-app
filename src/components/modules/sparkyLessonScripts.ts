import type { LessonScript } from './SparkyLesson'

// New chat-based lesson script based on provided script
export const newPromptBasicsLessonScript: LessonScript[] = [
  // Scene Intro
  {
    id: "scene-intro-1",
    type: "intro",
    sparkyMessage: "🎉 Hi there, Bright Thinker! I'm Sparky, your friendly Code Guide from the Kingdom of Curiosity. Around here, we use the power of prompts to unlock amazing things in the world of AI!",
    choices: []
  },
  {
    id: "scene-intro-2", 
    type: "intro",
    sparkyMessage: "Think of a prompt like a clear instruction or a tiny prayer for clarity — it's how we guide smart AIs to do awesome stuff like writing stories, solving puzzles, or even helping others.",
    choices: []
  },
  {
    id: "scene-intro-proceed",
    type: "intro", 
    sparkyMessage: "Ready to proceed?",
    choices: [
      { text: "Yes, please proceed", value: "proceed" }
    ]
  }
]

// Learning Goal section
export const learningGoalScript: LessonScript[] = [
  {
    id: "learning-goal",
    type: "lesson",
    sparkyMessage: "Today, I'll teach you how to make powerful prompts that help AIs understand exactly what you mean.",
    choices: [
      { text: "Let's learn!", value: "continue" }
    ]
  }
]

// Activity 1 - Vague vs Valuable
export const activity1Script: LessonScript[] = [
  {
    id: "activity1-intro",
    type: "activity",
    sparkyMessage: "Let's play a quick game called: 'Vague or Valuable?' I'll show you a prompt, and you choose: ❌ Vague (Too unclear) or ✅ Valuable (Nice and specific)",
    choices: [
      { text: "I'm ready to play!", value: "ready" }
    ]
  },
  {
    id: "activity1-prompt1",
    type: "activity", 
    sparkyMessage: "💬 Prompt 1: \"Tell me something.\" What do you think?",
    choices: [
      { text: "❌ Vague (Too unclear)", value: "vague", isCorrect: true },
      { text: "✅ Valuable (Nice and specific)", value: "valuable", isCorrect: false }
    ]
  },
  {
    id: "activity1-feedback1",
    type: "activity",
    sparkyMessage: "🎉 Correct! That's too vague. The AI won't know what you want.",
    choices: [
      { text: "Next prompt please!", value: "next" }
    ]
  },
  {
    id: "activity1-prompt2",
    type: "activity",
    sparkyMessage: "💬 Prompt 2: \"Write a short poem about a brave ant who saves the forest.\" What do you think?",
    choices: [
      { text: "❌ Vague (Too unclear)", value: "vague", isCorrect: false },
      { text: "✅ Valuable (Nice and specific)", value: "valuable", isCorrect: true }
    ]
  },
  {
    id: "activity1-feedback2", 
    type: "activity",
    sparkyMessage: "🎉 You've got it! That's a valuable prompt — specific, creative, and clear.",
    choices: [
      { text: "Awesome! What's next?", value: "continue" }
    ]
  }
]

// Activity 2 - Prompt Power-Up  
export const activity2Script: LessonScript[] = [
  {
    id: "activity2-intro",
    type: "activity",
    sparkyMessage: "Now you try! I'll show you a wobbly prompt, and you make it better. ✏️ Original: \"Make something about food.\" 🔨 Your Challenge: Rewrite this prompt to be more fun, more clear, more awesome. (You can use creativity — story, poem, list, anything!)",
    choices: [
      { text: "I'm ready to rewrite it!", value: "ready" }
    ]
  },
  {
    id: "activity2-input",
    type: "activity",
    sparkyMessage: "Please write your improved version of the prompt below:",
    inputRequired: true
  },
  {
    id: "activity2-feedback",
    type: "activity", 
    sparkyMessage: "Sparktastic! You gave it details and made it shine! 🌟",
    choices: [
      { text: "That was fun! What's next?", value: "continue" }
    ]
  }
]

// Power Unlocked - 3-Part Prompt Spell
export const powerUnlockedScript: LessonScript[] = [
  {
    id: "power-unlocked-intro",
    type: "lesson",
    sparkyMessage: "🏆 Power Unlocked: The 3-Part Prompt Spell! Every great prompt has 3 magic parts — kind of like a recipe!",
    choices: [
      { text: "Tell me the 3 parts!", value: "continue" }
    ]
  },
  {
    id: "power-unlocked-parts",
    type: "lesson",
    sparkyMessage: "🧠 1. Task – What do you want the AI to do?\n📦 2. Details – What topic, style, or purpose?\n🧾 3. Format – Should it be a list? A paragraph? A poem?",
    choices: [
      { text: "I understand the 3 parts!", value: "continue" }
    ]
  },
  {
    id: "power-unlocked-badge",
    type: "completion",
    sparkyMessage: "You just earned your Prompt Builder Badge! ⭐ Wear it with honor, Builder of Brilliant Ideas!",
    choices: [
      { text: "Thank you, Sparky!", value: "continue" }
    ]
  }
]

// Optional Reflection
export const reflectionScript: LessonScript[] = [
  {
    id: "reflection",
    type: "lesson",
    sparkyMessage: "You know, giving clear instructions reminds me of something important: When we talk to God, we try to be honest and thoughtful, right? That's kind of like giving a clear prompt from the heart — it helps us stay connected to what matters most. 💛",
    choices: [
      { text: "That's a beautiful connection!", value: "continue" },
      { text: "Ready for the next lesson!", value: "next" }
    ]
  }
]

// Ready for Lesson 2
export const nextLessonScript: LessonScript[] = [
  {
    id: "next-lesson-teaser",
    type: "completion",
    sparkyMessage: "🚪 Ready for Lesson 2? Next up: Level 2 – Zero-Shot Magic! You'll learn how to give one-shot instructions that work like a charm.",
    choices: [
      { text: "Yes! Take me to Lesson 2!", value: "lesson2" },
      { text: "I want to review this lesson first", value: "review" }
    ]
  }
]

// Original lesson script (keeping for reference)
export const promptBasicsLessonScript: LessonScript[] = [
  {
    id: "opening-welcome",
    type: "intro",
    sparkyMessage: "Hey there, future AI whisperer! 🌟 I'm Sparky, your friendly firefly guide, and I'm absolutely BUZZING with excitement to teach you about prompt engineering! Think of me as your personal AI trainer who's here to help you become a master at talking to AI. Ready to dive into the magical world of prompts?",
    choices: [
      { text: "Yes! Let's start learning!", value: "ready" },
      { text: "What exactly is prompt engineering?", value: "what-is-it" },
      { text: "I'm a bit nervous, but let's go!", value: "nervous-but-ready" }
    ]
  },
  {
    id: "what-is-prompt-engineering",
    type: "lesson",
    sparkyMessage: "Great question! 🤔 Prompt engineering is like being a translator between humans and AI. Just like how you might give specific instructions to a friend to help them understand exactly what you want, prompt engineering is about crafting the perfect instructions for AI systems. The better your instructions (prompts), the better results you'll get! It's part art, part science, and a whole lot of fun!",
    choices: [
      { text: "That makes sense! Let's continue.", value: "continue" },
      { text: "Can you give me an example?", value: "example-request" }
    ]
  },
  {
    id: "simple-example",
    type: "lesson",
    sparkyMessage: "Absolutely! ✨ Let's say you want an AI to write a story. A basic prompt might be: 'Write a story.' But a well-engineered prompt would be: 'Write a 200-word adventure story about a brave mouse who discovers a hidden treasure in an old library, written for 8-year-olds with a happy ending.' See the difference? The second one gives the AI clear guidance on length, genre, character, setting, audience, and tone!",
    choices: [
      { text: "Wow, that's so much more specific!", value: "specific-good" },
      { text: "How do I know what details to include?", value: "how-to-details" },
      { text: "Let's practice with an example!", value: "practice-ready" }
    ]
  },
  {
    id: "why-specificity-matters",
    type: "lesson",
    sparkyMessage: "Exactly! 🎯 Specificity is your superpower in prompt engineering! Think of AI like a really eager helper who wants to do exactly what you ask, but needs clear instructions. The more specific you are, the more likely you'll get results that match your vision. It's like giving someone directions to your house - 'go to my street' vs 'turn left at the red mailbox, third house on the right with the blue door!'",
    choices: [
      { text: "That's a perfect analogy!", value: "great-analogy" },
      { text: "What are the key elements of a good prompt?", value: "key-elements" }
    ]
  },
  {
    id: "key-elements",
    type: "lesson",
    sparkyMessage: "Great question! 🔑 The key elements of a stellar prompt include: **Context** (background info), **Task** (what you want done), **Format** (how you want the output), **Tone** (formal, casual, funny), **Length** (short, detailed), **Audience** (who it's for), and **Examples** (showing what you want). Think of it as the recipe for prompt success! Can you name one of these key elements?",
    inputRequired: true,
    expectedResponses: ["context", "task", "format", "tone", "length", "audience", "examples", "recipe"]
  },
  {
    id: "practice-introduction",
    type: "activity",
    sparkyMessage: "Perfect! 🌟 Now let's put this into practice. I'm going to give you a scenario, and you'll help me craft a better prompt. Ready for your first challenge? Here's the situation: You want an AI to help you plan a birthday party. Your first instinct might be to simply ask 'Help me plan a birthday party.' But we can do SO much better!",
    choices: [
      { text: "Let's make it more specific!", value: "improve-prompt" },
      { text: "What details should I consider?", value: "need-guidance" }
    ]
  },
  {
    id: "practice-guidance",
    type: "activity",
    sparkyMessage: "Smart thinking! 🎉 For a birthday party prompt, consider: Whose birthday? (age matters!), How many guests?, What's your budget?, Indoor or outdoor?, Any theme preferences?, Dietary restrictions?, How much time do you have to plan?, Any special requirements? The more details you provide, the more personalized and helpful the AI's suggestions will be! Now try writing a more detailed birthday party planning prompt! Include at least 3 of these details.",
    inputRequired: true
  },
  {
    id: "practice-feedback",
    type: "activity",
    sparkyMessage: "Fantastic work! 🎊 I love seeing you apply these concepts! Notice how much more actionable your detailed prompt is compared to just 'help me plan a birthday party'? This is the magic of prompt engineering - transforming vague requests into clear, specific instructions that get you exactly what you need. You're already thinking like a prompt engineer!",
    choices: [
      { text: "This is really helpful! What's next?", value: "whats-next" },
      { text: "Can we try another example?", value: "another-example" },
      { text: "I feel like I'm getting the hang of this!", value: "feeling-confident" }
    ]
  },
  {
    id: "common-mistakes",
    type: "lesson",
    sparkyMessage: "Awesome attitude! 🚀 Before we move on, let me share the most common mistakes beginners make: Being too vague ('write something good'), assuming the AI knows your context ('fix this like we discussed'), forgetting to specify format ('give me information' vs 'give me 5 bullet points'), and not iterating - remember, prompt engineering is about experimenting and refining!",
    choices: [
      { text: "Good to know what to avoid!", value: "avoid-mistakes" },
      { text: "How do I get better at this?", value: "how-improve" }
    ]
  },
  {
    id: "improvement-tips",
    type: "lesson",
    sparkyMessage: "Here's my secret recipe for improvement! 📈 **Practice regularly** - try rewriting prompts you see online, **Study examples** - collect prompts that work well, **Experiment** - try different approaches for the same task, **Iterate** - refine your prompts based on results, and **Join communities** - learn from other prompt engineers. Remember, every expert was once a beginner!",
    choices: [
      { text: "I'm excited to practice more!", value: "excited-practice" },
      { text: "This gives me confidence to try!", value: "confident" }
    ]
  },
  {
    id: "lesson-conclusion",
    type: "completion",
    sparkyMessage: "You've done amazing work today! 🌟 You've learned what prompt engineering is, understood the key elements of effective prompts, practiced crafting detailed instructions, and discovered how to avoid common pitfalls. You're well on your way to becoming an AI communication expert! Remember: specificity is your superpower, practice makes perfect, and every conversation with AI is a chance to improve your skills. Keep that curiosity burning bright! ✨",
    choices: [
      { text: "Thank you, Sparky! This was great!", value: "thank-you" },
      { text: "I'm ready for the next lesson!", value: "next-lesson" },
      { text: "Can I review the key points?", value: "review" }
    ]
  }
]

// Additional lesson scripts can be added here
export const availableLessons = {
  'prompt-basics': promptBasicsLessonScript,
  'prompt-basics-1-intro': newPromptBasicsLessonScript,
  'prompt-basics-1-learning-goal': learningGoalScript,
  'prompt-basics-1-activity1': activity1Script,
  'prompt-basics-1-activity2': activity2Script,
  'prompt-basics-1-power-unlocked': powerUnlockedScript,
  'prompt-basics-1-reflection': reflectionScript,
  'prompt-basics-1-next-lesson': nextLessonScript,
  // Future lessons:
  // 'advanced-techniques': advancedTechniquesScript,
  // 'context-management': contextManagementScript,
  // 'ai-safety': aiSafetyScript,
} as const

export type LessonType = keyof typeof availableLessons
