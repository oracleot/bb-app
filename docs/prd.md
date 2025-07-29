# AI & The Bible: Product Requirements Document (PRD)

## 1. Project Overview

### 1.1 Product Vision

An interactive web application that teaches children ages 9-15 the fundamentals of AI prompt engineering through biblical stories, combining faith-based education with modern technology skills.

### 1.2 Target Audience

- **Primary**: Children ages 9-15
- **Secondary**: Parents, teachers, youth pastors, homeschool educators
- **Device Usage**: Mobile-first (phones + tablets), desktop compatible

### 1.3 Core Value Proposition

- Learn AI prompt engineering through familiar biblical narratives
- Gamified learning experience with progress tracking
- Safe, faith-based introduction to AI technology
- Interactive activities tailored to different age groups

## 2. Technical Architecture

### 2.1 Tech Stack

```bash
# Core Foundation
npx create-next-app@latest bible-ai-app --typescript --tailwind --eslint --app
cd bible-ai-app

# Authentication & Database
npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared

# UI Components (The Holy Trinity)
npx shadcn@latest init
npm install framer-motion
# Magic UI and Aceternity UI components are copy-paste (no npm install needed)

# AI Integration
npm install ai @ai-sdk/openai @ai-sdk/anthropic

# Additional Utilities
npm install lucide-react react-hot-toast howler clsx tailwind-merge
npm install @types/howler # for TypeScript
```

**UI Libraries:**

- shadcn/ui (Primary Foundation): Accessible, customizable, Tailwind-compatible components
- Magic UI: Framer Motion-based animated components (copy-paste)
- Aceternity UI: Advanced visual effects and premium components (copy-paste)

**Other:**

- Supabase for authentication and database
- Vercel AI SDK for AI integration
- Lucide React for icons
- Howler.js for sound effects

### 2.2 Project Structure

```text
src/
├── components/
│   ├── ui/           # shadcn components
│   ├── magicui/      # Magic UI components
│   ├── aceternity/   # Aceternity UI components
│   ├── auth/         # Supabase auth components
│   └── modules/      # Custom module components
├── lib/
│   ├── supabase.ts   # Supabase client
│   ├── ai.ts         # AI SDK setup
│   └── utils.ts      # Utilities (cn, etc.)
└── app/
    ├── (auth)/       # Auth routes
    ├── dashboard/    # Main dashboard
    └── modules/      # Learning modules
```

## 3. Feature Specifications

### 3.1 Authentication System

**Requirements:**

- Simple username/password registration
- Login/logout functionality
- Password reset capability
- Session management
- Basic profile creation (name, age group)

**User Flow:**

1. Landing page with "Get Started" CTA
2. Registration form (username, password, age)
3. Email verification (optional for MVP)
4. Dashboard redirect after successful auth

### 3.2 Dashboard/Home Screen

**Components:**

- Welcome message with user's name
- Progress overview (modules completed, badges earned)
- Module selection grid (6 modules)
- Recent activity feed
- Settings/profile access

**Visual Design:**

- Hero section with animated biblical/tech imagery
- Progress ring showing overall completion
- Module cards with preview images and progress indicators
- Responsive grid layout

### 3.3 Module Structure

Each module follows this pattern:

**Module Navigation:**

- Breadcrumb navigation
- Progress indicator (5 screens per module)
- Back/Next buttons
- Exit to dashboard option

**Screen Types:**

1. **Concept Introduction** (The Big Idea)
2. **Biblical Case Study** (Interactive story)
3. **Connection** (Aha moment)
4. **Digital Workshop** (Activities)
5. **Takeaway** (Reflection)

## 4. Detailed Module Specifications

### 4.1 Module 1: What is a Prompt?

**Learning Objective:** Understand that a prompt is an instruction that creates a result

**Screen Flow:**

1. **Concept**: Animation showing search → results
2. **Case Study**: Genesis Creation story (4 scenes)
3. **Connection**: God's words as ultimate prompts
4. **Workshop**: Age-appropriate activities
   - Juniors: "Is it a Prompt?" quiz
   - Teens: Wish → Prompt converter
5. **Takeaway**: Reflection on word power

**Interactive Elements:**

- Click-through story progression
- Yes/No quiz interface
- Drag-and-drop sentence builder
- Text input for reflection

### 4.2 Module 2: The Power of Specificity

**Learning Objective:** Specific prompts yield better results

**Key Activities:**

- Split-screen vague vs. specific demonstration
- Noah's Ark detailed instructions story
- Detail-adding drag-and-drop activity
- Prompt refinement exercise

### 4.3 Module 3: Providing a Persona

**Learning Objective:** Assigning roles changes AI output style

**Key Activities:**

- Role-play demonstration
- Nathan's storytelling approach
- Character costume selection activity
- Persona prompt writing

### 4.4 Module 4: Learning from Examples

**Learning Objective:** Examples teach AI patterns (few-shot prompting)

**Key Activities:**

- Pattern completion exercises
- Jesus teaching prayer as example
- Example-based AI teaching activity
- Pattern recognition games

### 4.5 Module 5: Thinking Step-by-Step

**Learning Objective:** Breaking down complex problems improves accuracy

**Key Activities:**

- Step-by-step problem solving
- Solomon's wisdom demonstration
- Process ordering activities
- Complex prompt structuring

### 4.6 Module 6: Capstone Project

**Learning Objective:** Combine all skills in creative project

**Key Activities:**

- Bible story selection
- Multi-field prompt builder
- AI story generation
- Personal library/showcase

## 5. User Experience Specifications

### 5.1 Age-Appropriate Design

**Juniors (9-11):**

- Larger buttons and touch targets
- Simpler language and shorter text
- More visual/drag-drop activities
- Immediate positive feedback
- Celebration animations for achievements

**Teens (12-15):**

- Text input exercises
- More complex problem-solving
- Detailed explanations
- Creative writing opportunities
- Achievement tracking

### 5.2 Gamification Elements

**Progress Tracking:**

- Module completion badges
- Overall progress percentage
- Streak counters for consecutive days
- Special achievements for perfect scores

**Visual Feedback:**

- Confetti animations for completions
- Progress bars and rings
- Star ratings for activities
- Unlockable content/themes

**Sound Design:**

- Success chimes
- Background ambient music (toggleable)
- Click/tap feedback sounds
- Celebration fanfares

## 6. Content Management

### 6.1 Static Content Structure

```text
content/
├── modules/
│   ├── module-1/
│   │   ├── screens/
│   │   ├── activities/
│   │   └── metadata.json
│   └── ...
├── images/
└── audio/
```

### 6.2 Content Types

- **Text Content**: Stories, definitions, instructions
- **Activity Configurations**: Quiz questions, drag-drop items
- **Image Prompts**: Detailed descriptions for future illustration
- **Audio Cues**: Sound effect triggers and background music

## 7. AI Integration Specifications

### 7.1 AI-Powered Features

**Story Generation (Module 6):**

- User inputs persona, specificity, examples, structure
- AI generates custom biblical story retelling
- Output formatting and validation

**Response Simulation:**

- Pre-programmed AI responses for activities
- Dynamic prompt evaluation
- Feedback generation for user inputs

### 7.2 AI Model Requirements

- **Primary**: GPT-4 or Claude for story generation
- **Secondary**: Smaller model for simple responses
- **Fallbacks**: Pre-written responses if AI unavailable

## 8. Database Schema

### 8.1 Core Tables

```sql
-- Users
users (
  id, username, email, password_hash, 
  age_group, created_at, updated_at
)

-- Progress Tracking
user_progress (
  id, user_id, module_id, screen_id, 
  completed_at, score, attempts
)

-- Generated Content
user_stories (
  id, user_id, module_id, story_title, 
  story_content, prompt_used, created_at
)

-- Achievements
user_achievements (
  id, user_id, achievement_type, 
  earned_at, metadata
)
```

## 9. Performance Requirements

### 9.1 Loading Standards

- Initial page load: < 3 seconds
- Module transitions: < 1 second
- AI response generation: < 10 seconds
- Offline fallbacks for static content

### 9.2 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode option
- Font size adjustability

## 10. Development Phases

### 10.1 Phase 1: Foundation (Weeks 1-2)

- [ ] Next.js project setup
- [ ] Authentication system
- [ ] Basic routing and layout
- [ ] Database schema implementation
- [ ] Landing page and dashboard

### 10.2 Phase 2: Core Modules (Weeks 3-5)

- [ ] Module 1: Prompt Basics
- [ ] Module 2: Specificity
- [ ] Module 3: Personas
- [ ] Progress tracking system
- [ ] Basic gamification

### 10.3 Phase 3: Advanced Features (Weeks 6-7)

- [ ] Module 4: Examples
- [ ] Module 5: Step-by-step
- [ ] AI integration
- [ ] Sound effects and animations

### 10.4 Phase 4: Capstone & Polish (Weeks 8-9)

- [ ] Module 6: Creative project
- [ ] User story generation
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Testing and bug fixes

## 11. Success Metrics

### 11.1 Engagement Metrics

- Module completion rates
- Time spent per module
- Return user percentage
- Activity completion rates

### 11.2 Learning Metrics

- Quiz scores and improvement
- Quality of generated prompts
- Creative story outputs
- User feedback ratings

## 12. Launch Strategy

### 12.1 MVP Features

- All 6 modules functional
- User authentication and progress
- Basic AI integration
- Mobile-responsive design
- Essential gamification elements

### 12.2 Post-Launch Enhancements

- Advanced animations and visual effects
- Additional biblical stories
- Multiplayer/classroom features
- Parent/teacher dashboards
- Content management system

---

## Appendix: Technical Considerations

### A.1 Security

- Input validation for all user content
- Rate limiting for AI API calls
- Secure password storage
- HTTPS enforcement

### A.2 Scalability

- Vercel serverless architecture
- Database connection pooling
- CDN for static assets
- Caching strategies for AI responses

### A.3 Monitoring

- Error tracking (Sentry)
- Performance monitoring
- User analytics
- AI usage metrics
