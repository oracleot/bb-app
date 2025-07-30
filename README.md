# AI & The Bible: A Kid's Guide to Prompt Engineering

> An interactive web application that teaches children ages 9-15 the fundamentals of AI prompt engineering through engaging biblical stories.

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Target Audience](https://img.shields.io/badge/Age%20Group-9--15-blue)
![Platform](https://img.shields.io/badge/Platform-Web%20App-green)

## 🌟 Overview

**AI & The Bible** combines timeless biblical narratives with cutting-edge AI education, teaching young learners how to communicate effectively with artificial intelligence through familiar, faith-based stories. Each module uses a biblical case study to illustrate modern prompt engineering concepts, making complex technical skills accessible and meaningful.

### ✨ Key Features

- **6 Interactive Learning Modules** covering essential prompt engineering skills
- **Age-Appropriate Content** with separate tracks for Juniors (9-11) and Teens (12-15)
- **Gamified Learning** with progress tracking, badges, and achievements
- **Biblical Integration** using stories like Creation, Noah's Ark, and Solomon's Wisdom
- **AI-Powered Activities** including story generation and interactive exercises
- **Mobile-First Design** optimized for phones, tablets, and desktop

## 📚 Learning Modules

### Module 1: What is a Prompt?

**Biblical Case Study:** The Creation Story (Genesis 1)

- Learn that prompts are instructions that create results
- Understand how God's words were the ultimate creative prompts
- Activities: Prompt identification games, sentence builders

### Module 2: The Power of Specificity

**Biblical Case Study:** Noah's Ark (Genesis 6)

- Discover how detailed instructions lead to better results
- Compare vague vs. specific prompts using Noah's detailed ark plans
- Activities: Detail-adding exercises, prompt refinement tasks

### Module 3: Providing a Persona

**Biblical Case Study:** Prophet Nathan & King David (2 Samuel 12)

- Learn to assign roles and personalities to AI
- See how Nathan used storytelling to reach David's heart
- Activities: Character selection, persona prompt writing

### Module 4: Learning from Examples

**Biblical Case Study:** Jesus Teaching Prayer (Matthew 6:9-13)

- Master few-shot prompting through examples
- Study how Jesus taught the disciples with the Lord's Prayer pattern
- Activities: Pattern completion, example-based teaching

### Module 5: Thinking Step-by-Step

**Biblical Case Study:** Solomon's Wisdom (1 Kings 3:16-28)

- Break complex problems into manageable steps
- Learn from Solomon's methodical approach to difficult decisions
- Activities: Process ordering, step-by-step prompt creation

### Module 6: Capstone Project

**Biblical Case Study:** User's Choice

- Combine all learned skills in a creative project
- Generate unique biblical story retellings with AI
- Create a personal library of AI-generated stories

## 🛠️ Tech Stack

### Core Framework

- **Next.js 14** with TypeScript and App Router
- **Tailwind CSS** for styling
- **Vercel** for deployment

### UI Components

- **shadcn/ui** - Accessible, customizable component library
- **Magic UI** - Framer Motion-based animations
- **Aceternity UI** - Advanced visual effects
- **Lucide React** - Icon library

### Backend Services

- **Supabase** - Authentication and database
- **Vercel AI SDK** - AI integration (OpenAI, Anthropic)
- **Howler.js** - Audio and sound effects

### Additional Tools

- **Framer Motion** - Animations and transitions
- **React Hot Toast** - Notifications
- **TypeScript** - Type safety

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account for database and auth
- OpenAI or Anthropic API key for AI features

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/bb-app.git
    cd bb-app
    ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**

   ```bash
   # Run Supabase migrations
   npx supabase migration up
   ```

5. **Install UI components**

   ```bash
   # Initialize shadcn/ui
   npx shadcn@latest init
   
   # Add required components
   npx shadcn@latest add button card input progress badge
   ```

6. **Start the development server**

   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to see the app in action!

## 📱 User Experience

### Age-Appropriate Design

**Juniors (9-11):**

- Large, colorful buttons and touch targets
- Drag-and-drop activities and visual interactions
- Simple language with immediate positive feedback
- Celebration animations for achievements

**Teens (12-15):**

- Text input exercises and creative writing
- More complex problem-solving challenges
- Detailed explanations and deeper concepts
- Achievement tracking and progress analytics

### Gamification Elements

- ⭐ Module completion badges and achievements
- 📊 Progress tracking with visual indicators
- 🎉 Celebration animations and sound effects
- 🏆 Streak counters and special unlockables

## 🗂️ Project Structure

```text
src/
├── app/
│   ├── auth/           # Authentication routes
│   ├── dashboard/      # Main dashboard
│   ├── modules/        # Learning modules
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # shadcn components
│   ├── magicui/        # Magic UI components
│   ├── auth/           # Authentication components
│   └── modules/        # Module-specific components
├── hooks/              # Custom hooks
└── lib/
    ├── supabase.ts     # Supabase client
    ├── ai.ts           # AI SDK configuration
    └── utils.ts        # Utility functions
```

## 🤝 Contributing

We welcome contributions from developers, educators, and content creators! Here's how you can help:

### Development Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Content Contributions

- Suggest additional activities or exercises
- Provide translations for international audiences
- Create accessibility improvements

### Issue Reporting

- Use GitHub Issues for bug reports
- Include device/browser information
- Provide steps to reproduce issues
- Suggest improvements or new features

## 📊 Success Metrics

### Engagement Metrics

- Module completion rates across age groups
- Average time spent per learning session
- Return user percentage and retention
- Activity completion and replay rates

### Learning Outcomes

- Pre/post assessment improvements
- Quality of user-generated prompts
- Creative story output evaluations
- User satisfaction and feedback ratings

## 🔒 Privacy & Safety

- **Child-Safe Environment**: No personal data collection beyond username/progress
- **Content Moderation**: All AI-generated content is filtered for appropriateness
- **Secure Authentication**: Industry-standard password hashing and session management
- **COPPA Compliance**: Designed with children's privacy regulations in mind

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Educational Framework**: Inspired by modern pedagogy and gamification research
- **AI Integration**: Built with ethical AI principles and responsible usage guidelines

---

Built with ❤️ to bridge faith and technology for the next generation
