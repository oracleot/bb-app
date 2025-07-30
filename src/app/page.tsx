"use client";

import Link from "next/link";
import { Meteors } from "@/components/magicui/meteors";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/magicui/terminal";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Meteors number={30} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 max-w-[1200px] mx-auto">
        <div className="w-full mx-auto">
          <div className="grid lg:grid-cols-2 items-center">
            
            {/* Left Column - Title, Description, CTA */}
            <div className="flex flex-col justify-center space-y-8 text-center lg:text-left order-2 lg:order-1 my-8 lg:my-0">
              <div className="space-y-6">
                <h1 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-5xl lg:text-6xl xl:text-7xl font-black leading-none text-transparent dark:from-white dark:to-slate-900/10">
                  <AuroraText>Prompt Engineering</AuroraText>
                  <span className="block">for Kids</span>
                </h1>
                
                <p className="text-lg sm:text-xl font-bold leading-relaxed text-gray-700 dark:text-gray-300 lg:mx-0">
                  An interactive web app teaching kids AI prompt engineering through biblical stories.
                  <span className="block mt-2">Gamified . Safe . Fun!</span>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/auth/register">
                  <RainbowButton size="lg" className="w-full sm:w-auto">
                    Get Started
                  </RainbowButton>
                </Link>
                <Link href="/auth/login">
                  <RainbowButton variant="outline" size="lg" className="w-full sm:w-auto">
                    Login
                  </RainbowButton>
                </Link>
              </div>
            </div>

            {/* Right Column - Terminal */}
            <div className="flex justify-center lg:justify-end order-2">
              <Terminal className="shadow-2xl w-full max-w-[375px]">
                <TypingAnimation>
                  Can you tell me the story of Jesus
                </TypingAnimation>

                <TypingAnimation delay={2500}>
                  and the Samaritan woman?
                </TypingAnimation>

                <AnimatedSpan delay={4100} className="text-green-500">
                  <span>✔ Analyzing request: Bible story</span>
                </AnimatedSpan>
          
                <AnimatedSpan delay={5000} className="text-green-500">
                  <span>✔ Searching biblical reference</span>
                </AnimatedSpan>
          
                <AnimatedSpan delay={6000} className="text-green-500">
                  <span>✔ Identifying key themes</span>
                </AnimatedSpan>
          
                <AnimatedSpan delay={7000} className="text-green-500">
                  <span>✔ Adapting language for ages 9-15</span>
                </AnimatedSpan>
          
                <AnimatedSpan delay={8000} className="text-green-500">
                  <span>✔ Structuring story</span>
                </AnimatedSpan>
          
                <AnimatedSpan delay={9500} className="text-blue-500">
                  <span>ℹ Ready to share an amazing story!</span>
                </AnimatedSpan>
          
                <TypingAnimation delay={10500} className="text-muted-foreground">
                  Once upon a time, Jesus was walking
                </TypingAnimation>
          
                <TypingAnimation delay={12500} className="text-muted-foreground">
                  through a place called Samaria when
                </TypingAnimation>

                <TypingAnimation delay={14500} className="text-muted-foreground">
                  he got really thirsty and he sat
                </TypingAnimation>

                <TypingAnimation delay={16500} className="text-muted-foreground">
                  down by an old well ...
                </TypingAnimation>
              </Terminal>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 px-4 text-center border-t bg-white/80 dark:bg-black/40 text-gray-700 dark:text-gray-300 text-sm font-medium backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <span>Powered by <AuroraText>BelieverBytes</AuroraText></span>
          <span className="block mt-2">An initiative of RCCG Morningstar Kirknewton</span>
        </div>
      </footer>
    </div>
  );
}
