'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw, Star } from 'lucide-react';
import { SnakeGameOnboarding } from '../../../components/modules/SnakeGameOnboarding';

const GRID_SIZE = 5;

const DIRECTIONS = {
	up: { x: 0, y: -1 },
	down: { x: 0, y: 1 },
	left: { x: -1, y: 0 },
	right: { x: 1, y: 0 },
};

// Fix food typing so all items have optional color
interface Food {
	x: number;
	y: number;
	type: string;
	color?: string;
}

// New types for enhanced prompt engineering features
interface PersonaConfig {
	character: string;
	description: string;
	style: 'confident' | 'cautious' | 'brave' | 'wise';
	commandStyle?: string;
	feedbackStyle?: string;
}

interface ExamplePrompt {
	scenario: string;
	goodPrompt: string;
	explanation?: string;
}

interface ReasoningConfig {
	requireExplanation: boolean;
	stepByStep: boolean;
	showThinking?: boolean;
}

// Enhanced level interface
interface Level {
	id: number;
	title: string;
	description: string;
	goal: string;
	snake: Array<{ x: number; y: number }>;
	food: Food[];
	obstacles: Array<{ x: number; y: number }>;
	gates: Array<{ x: number; y: number }>;
	keys: Array<{ x: number; y: number; color?: string }>;
	lesson: string;
	// New optional fields for enhanced features
	persona?: PersonaConfig;
	examples?: ExamplePrompt[];
	reasoning?: ReasoningConfig;
	module?: 1 | 2 | 3 | 4 | 5; // Which module this level teaches
}

// Update LEVELS to use Level interface with module classification
const LEVELS: Level[] = [
	{
		id: 1,
		title: 'First Steps',
		description: 'Give the snake a complete instruction to get the apple!',
		goal: 'Go to the apple and eat it',
		snake: [{ x: 2, y: 2 }],
		food: [{ x: 4, y: 2, type: 'apple' }],
		obstacles: [],
		gates: [],
		keys: [],
		lesson: "Try: 'go right 2 times then eat apple' - give complete instructions!",
		module: 1, // Basic prompting
	},
	{
		id: 2,
		title: 'Around Obstacles',
		description: 'Navigate around the wall with one instruction',
		goal: 'Get the apple, but avoid the wall',
		snake: [{ x: 1, y: 2 }],
		food: [{ x: 4, y: 1, type: 'apple' }],
		obstacles: [{ x: 3, y: 2 }],
		gates: [],
		keys: [],
		lesson: "Try: 'go up 1 time, then go right 3 times, then go down 1 time, then eat apple'",
		module: 1, // Basic prompting with obstacles
	},
	{
		id: 3,
		title: 'Colors Matter',
		description: 'Be specific about which apple you want!',
		goal: 'Eat the RED apple only',
		snake: [{ x: 2, y: 2 }],
		food: [
			{ x: 1, y: 1, type: 'apple', color: 'blue' },
			{ x: 4, y: 1, type: 'apple', color: 'red' },
		],
		obstacles: [],
		gates: [],
		keys: [],
		lesson: "Try: 'go up 1 time, then go right 2 times, then eat red apple'",
		module: 2, // Specificity
	},
	{
		id: 4,
		title: 'Multi-Step Plans',
		description: 'Plan the whole journey: get the key, then the apple',
		goal: 'Get the key, then the apple',
		snake: [{ x: 0, y: 2 }],
		food: [{ x: 4, y: 0, type: 'apple' }],
		obstacles: [{ x: 2, y: 1 }, { x: 2, y: 3 }],
		gates: [],
		keys: [{ x: 1, y: 0, color: 'blue' }],
		lesson: "Try: 'go up 2 times, then go right 1 time, then get key, then go right 3 times, then eat apple'",
		module: 5, // Basic chain-of-thought
	},
	// NEW PERSONA LEVELS - Module 3
	{
		id: 5,
		title: 'King David\'s Courage',
		description: 'Command like the brave king who faced Goliath!',
		goal: 'Advance boldly to claim the golden apple',
		snake: [{ x: 0, y: 2 }],
		food: [{ x: 4, y: 2, type: 'apple', color: 'yellow' }],
		obstacles: [{ x: 2, y: 2 }],
		gates: [],
		keys: [],
		lesson: "Try: 'advance up 1 time, then march right 3 times, then charge down 1 time, then eat apple' - Use bold, confident commands!",
		module: 3, // Persona - King David
		persona: {
			character: 'King David',
			description: 'The brave shepherd who became a mighty king',
			style: 'confident',
			commandStyle: 'Use bold words like "advance", "charge", "march"',
			feedbackStyle: 'Responds with royal confidence and courage'
		}
	},
	{
		id: 6,
		title: 'Moses\' Careful Leadership',
		description: 'Guide your people with the wisdom of Moses',
		goal: 'Carefully lead to the promised apple, avoiding danger',
		snake: [{ x: 1, y: 4 }],
		food: [{ x: 3, y: 0, type: 'apple' }],
		obstacles: [{ x: 1, y: 2 }, { x: 3, y: 2 }, { x: 1, y: 1 }],
		gates: [],
		keys: [],
		lesson: "Try: 'carefully go right 2 times, then cautiously go up 2 times, then slowly go up 2 times, then eat apple'",
		module: 3, // Persona - Moses
		persona: {
			character: 'Moses',
			description: 'The wise leader who guided Israel through the wilderness',
			style: 'cautious',
			commandStyle: 'Use careful words like "carefully", "cautiously", "slowly"',
			feedbackStyle: 'Responds with wisdom and measured guidance'
		}
	},
	{
		id: 7,
		title: 'Daniel\'s Faith',
		description: 'Show the courage of Daniel in the lion\'s den',
		goal: 'Move with faith through the obstacles to reach salvation',
		snake: [{ x: 0, y: 0 }],
		food: [{ x: 4, y: 4, type: 'apple' }],
		obstacles: [{ x: 2, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 3 }],
		gates: [],
		keys: [],
		lesson: "Try: 'with faith go right 2 times, then bravely go down 2 times, then courageously go right 2 times, then courageously go down 2 times, then eat apple'",
		module: 3, // Persona - Daniel
		persona: {
			character: 'Daniel',
			description: 'The faithful prophet who trusted God in the lion\'s den',
			style: 'brave',
			commandStyle: 'Use faith-based words like "with faith", "bravely", "courageously"',
			feedbackStyle: 'Responds with unwavering faith and divine confidence'
		}
	},
	{
		id: 8,
		title: 'Solomon\'s Wisdom',
		description: 'Use the strategic mind of the wisest king',
		goal: 'Think strategically to collect the key and reach the treasure',
		snake: [{ x: 0, y: 4 }],
		food: [{ x: 4, y: 0, type: 'apple', color: 'yellow' }],
		obstacles: [{ x: 2, y: 3 }, { x: 3, y: 2 }, { x: 1, y: 1 }],
		gates: [],
		keys: [{ x: 2, y: 1, color: 'gold' }],
		lesson: "Try: 'wisely go right 1 time, then thoughtfully go up 2 times, then strategically go right 1 time, then get key, then thoughtfully go right 2 times, then wisely go up 1 time, then eat apple'",
		module: 3, // Persona - Solomon
		persona: {
			character: 'Solomon',
			description: 'The wisest king who sought understanding above all else',
			style: 'wise',
			commandStyle: 'Use analytical words like "wisely", "strategically", "thoughtfully"',
			feedbackStyle: 'Responds with deep wisdom and strategic insight'
		}
	},
	// NEW FEW-SHOT LEARNING LEVELS - Module 4
	{
		id: 9,
		title: 'Learning from Examples: Basic Patterns',
		description: 'Study the examples, then follow the pattern like the disciples learning prayer',
		goal: 'Use the example pattern to reach the apple',
		snake: [{ x: 0, y: 2 }],
		food: [{ x: 3, y: 2, type: 'apple' }],
		obstacles: [],
		gates: [],
		keys: [],
		lesson: "Study the examples, then create your own prompt following the same pattern!",
		module: 4, // Few-shot learning
		examples: [
			{
				scenario: "Pattern: Simple Movement",
				goodPrompt: "go right 2 times, then eat apple",
				explanation: "Direct movement + action"
			},
			{
				scenario: "Pattern: Count + Direction + Action", 
				goodPrompt: "go left 1 time, then eat apple",
				explanation: "Always specify count, direction, then action"
			}
		]
	},
	{
		id: 10,
		title: 'Following Jesus\' Pattern: The Lord\'s Prayer Model',
		description: 'Like Jesus taught prayer with examples, learn prompting patterns',
		goal: 'Follow the three-part pattern: Address + Request + Action',
		snake: [{ x: 1, y: 1 }],
		food: [{ x: 3, y: 3, type: 'apple', color: 'red' }],
		obstacles: [{ x: 2, y: 2 }],
		gates: [],
		keys: [],
		lesson: "Follow the pattern from the examples: mention the snake, give direction, then specify the action!",
		module: 4, // Few-shot learning
		examples: [
			{
				scenario: "Pattern Example 1:",
				goodPrompt: "snake, go right 1 time, then go down 1 time, then eat red apple",
				explanation: "Address (snake) + Direction (go right/down) + Action (eat)"
			},
			{
				scenario: "Pattern Example 2:",
				goodPrompt: "snake, go up 2 times, then go left 1 time, then eat apple", 
				explanation: "Same pattern: Address + Direction + Action"
			}
		]
	},
	{
		id: 11,
		title: 'Advanced Pattern Recognition: Multi-Step Sequences',
		description: 'Master complex patterns like the disciples mastered prayer',
		goal: 'Follow the key-collection pattern from the examples',
		snake: [{ x: 0, y: 0 }],
		food: [{ x: 4, y: 4, type: 'apple', color: 'blue' }],
		obstacles: [{ x: 2, y: 1 }, { x: 1, y: 3 }],
		gates: [],
		keys: [{ x: 2, y: 3, color: 'blue' }],
		lesson: "Use the same pattern as the examples: Move to key, collect it, then move to matching apple!",
		module: 4, // Few-shot learning
		examples: [
			{
				scenario: "Key Collection Pattern:",
				goodPrompt: "go right 2 times, then go down 1 time, then get blue key, then go right 2 times, then go down 1 time, then eat blue apple",
				explanation: "Move → Collect Key → Move → Eat Matching Apple"
			},
			{
				scenario: "Another Key Pattern:",
				goodPrompt: "go up 1 time, then go right 1 time, then get red key, then go down 2 times, then eat red apple",
				explanation: "Same pattern with different colors and directions"
			}
		]
	},
	{
		id: 12,
		title: 'Pattern Mastery: Create Your Own Solution', 
		description: 'Like the disciples creating their own prayers, craft your solution',
		goal: 'Use pattern recognition to solve this new challenge',
		snake: [{ x: 4, y: 0 }],
		food: [{ x: 0, y: 4, type: 'apple', color: 'yellow' }],
		obstacles: [{ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 4 }],
		gates: [],
		keys: [{ x: 1, y: 2, color: 'yellow' }],
		lesson: "No specific example this time! Use what you learned from the patterns to solve this challenge.",
		module: 4, // Few-shot learning - pattern application
		examples: [
			{
				scenario: "Remember the patterns you learned:",
				goodPrompt: "Address + Navigate + Collect + Navigate + Achieve Goal",
				explanation: "Apply the multi-step sequence pattern you've practiced"
			}
		]
	},
	// NEW CHAIN-OF-THOUGHT REASONING LEVELS - Module 5
	{
		id: 13,
		title: 'Solomon\'s Wisdom: Basic Reasoning',
		description: 'Learn to explain your thinking like the wisest king',
		goal: 'Provide reasoning for your actions before moving',
		snake: [{ x: 0, y: 2 }],
		food: [{ x: 3, y: 2, type: 'apple', color: 'yellow' }],
		obstacles: [{ x: 1, y: 2 }],
		gates: [],
		keys: [],
		lesson: "Include your reasoning! Try: 'First I need to go around the obstacle, so I will go up 1 time, then go right 2 times, then go down 1 time, then go right 1 time, then eat apple because this avoids the wall'",
		module: 5, // Chain-of-thought reasoning
		reasoning: {
			requireExplanation: true,
			stepByStep: true,
			showThinking: true
		},
		persona: {
			character: 'Solomon',
			description: 'The wise king who thinks before acting',
			style: 'wise',
			commandStyle: 'Explain your reasoning with "First I need to..., so I will..., because..."',
			feedbackStyle: 'Responds with wisdom about the thought process'
		}
	},
	{
		id: 14,
		title: 'The Queen of Sheba\'s Challenge: Step-by-Step Problem Solving',
		description: 'Solve complex problems with systematic thinking',
		goal: 'Break down the problem into logical steps with reasoning',
		snake: [{ x: 0, y: 0 }],
		food: [{ x: 4, y: 4, type: 'apple', color: 'red' }],
		obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
		gates: [],
		keys: [{ x: 4, y: 0, color: 'red' }],
		lesson: "Think step-by-step! Try: 'The problem is reaching the apple while avoiding obstacles, so first I need to get the key because it matches the apple color, then I must find a clear path because the direct route is blocked, therefore I will go right 1 time, then go down 2 times, then go right 3 times, then get red key, then go down 4 times, then eat red apple'",
		module: 5, // Chain-of-thought reasoning
		reasoning: {
			requireExplanation: true,
			stepByStep: true,
			showThinking: true
		},
		persona: {
			character: 'Solomon',
			description: 'Demonstrating wisdom to the Queen of Sheba through systematic thinking',
			style: 'wise',
			commandStyle: 'Break down complex problems: "The problem is..., so first..., then..., because..."',
			feedbackStyle: 'Provides deep analysis of the reasoning process'
		}
	},
	{
		id: 15,
		title: 'The Judgment of Solomon: Complex Multi-Step Reasoning',
		description: 'Navigate competing priorities with wise judgment',
		goal: 'Choose the optimal path considering multiple factors',
		snake: [{ x: 2, y: 4 }],
		food: [
			{ x: 0, y: 0, type: 'apple', color: 'blue' },
			{ x: 4, y: 0, type: 'apple', color: 'yellow' }
		],
		obstacles: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 3 }],
		gates: [],
		keys: [
			{ x: 0, y: 2, color: 'blue' },
			{ x: 4, y: 2, color: 'yellow' }
		],
		lesson: "Consider multiple factors! Try: 'Given that there are two possible goals, I must analyze which is better, so first I will evaluate the blue path because it is closer, but the yellow path might be more efficient, therefore I will choose the blue route and go left 2 times, then get blue key, then go up 2 times, then eat blue apple because this minimizes total moves and avoids unnecessary obstacles'",
		module: 5, // Chain-of-thought reasoning
		reasoning: {
			requireExplanation: true,
			stepByStep: true,
			showThinking: true
		},
		persona: {
			character: 'Solomon',
			description: 'Making wise judgments between competing alternatives',
			style: 'wise',
			commandStyle: 'Analyze options: "Given that..., I must consider..., therefore I choose... because..."',
			feedbackStyle: 'Evaluates the wisdom and logic of the chosen reasoning'
		}
	},
	{
		id: 16,
		title: 'Master of Wisdom: Advanced Reasoning Challenge',
		description: 'Demonstrate mastery of systematic thinking and problem solving',
		goal: 'Solve the ultimate reasoning challenge with complete explanation',
		snake: [{ x: 2, y: 2 }],
		food: [{ x: 0, y: 0, type: 'apple', color: 'gold' }],
		obstacles: [
			{ x: 1, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 1 }, { x: 4, y: 1 },
			{ x: 1, y: 4 }, { x: 3, y: 4 }, { x: 0, y: 3 }, { x: 4, y: 3 }
		],
		gates: [],
		keys: [
			{ x: 2, y: 0, color: 'silver' },
			{ x: 0, y: 2, color: 'bronze' },
			{ x: 4, y: 2, color: 'gold' }
		],
		lesson: "Show complete mastery! Explain your full reasoning process including problem analysis, strategy selection, and step-by-step execution with justification for each decision.",
		module: 5, // Chain-of-thought reasoning - mastery level
		reasoning: {
			requireExplanation: true,
			stepByStep: true,
			showThinking: true
		},
		persona: {
			character: 'Solomon',
			description: 'The ultimate test of wisdom and systematic thinking',
			style: 'wise',
			commandStyle: 'Demonstrate complete reasoning mastery with full analysis and justification',
			feedbackStyle: 'Provides comprehensive evaluation of reasoning depth and accuracy'
		}
	},
];

// Enhanced Command type for persona and reasoning support
type Command = {
	type: 'move' | 'eat' | 'get' | 'think' | 'reason';
	direction?: keyof typeof DIRECTIONS;
	count?: number;
	target?: string;
	color?: string;
	reasoning?: string; // For chain-of-thought mode
	persona?: string; // For persona-specific styling
};

function parsePrompt(prompt: string, persona?: PersonaConfig, requireReasoning?: boolean): Command[] {
	// Split by 'then' for multi-step instructions
	const steps = prompt.toLowerCase().split(/\s*then\s*/);
	const commands: Command[] = [];
	
	// Extract reasoning if present and required
	let extractedReasoning = '';
	if (requireReasoning) {
		// Look for reasoning patterns
		const reasoningPatterns = [
			/because\s+(.+?)(?:\s*,|\s*then|\s*so|\s*$)/,
			/first\s+i\s+need\s+to\s+(.+?)(?:\s*,|\s*so|\s*because)/,
			/the\s+problem\s+is\s+(.+?)(?:\s*,|\s*so|\s*therefore)/,
			/given\s+that\s+(.+?)(?:\s*,|\s*i\s+will|\s*therefore)/,
			/so\s+i\s+will\s+(.+?)(?:\s*because|\s*then|\s*,)/,
			/therefore\s+(.+?)(?:\s*because|\s*,|\s*$)/
		];
		
		for (const pattern of reasoningPatterns) {
			const match = prompt.match(pattern);
			if (match) {
				extractedReasoning += (extractedReasoning ? ' ' : '') + match[1].trim();
			}
		}
	}
	
	for (const step of steps) {
		// Handle addressing pattern from few-shot learning (e.g., "snake, go right")
		const cleanStep = step.replace(/^snake,?\s*/, ''); // Remove "snake," prefix if present
		
		// Handle persona-specific movement styles
		if (persona) {
			// Map persona styles to movement patterns
			switch (persona.style) {
				case 'confident':
					// King David style - direct, bold commands
					if (/advance|charge|march/.test(cleanStep)) {
						const match = cleanStep.match(/(advance|charge|march) (up|down|left|right)(?: (\d+))?/);
						if (match) {
							commands.push({
								type: 'move',
								direction: match[2] as keyof typeof DIRECTIONS,
								count: match[3] ? parseInt(match[3], 10) : 1,
								persona: persona.character,
								reasoning: extractedReasoning || undefined,
							});
							continue;
						}
					}
					break;
				case 'cautious':
					// Moses style - careful, measured commands
					if (/carefully|cautiously|slowly/.test(cleanStep)) {
						const match = cleanStep.match(/(carefully|cautiously|slowly) (go|move) (up|down|left|right)(?: (\d+))?/);
						if (match) {
							commands.push({
								type: 'move',
								direction: match[3] as keyof typeof DIRECTIONS,
								count: match[4] ? parseInt(match[4], 10) : 1,
								persona: persona.character,
								reasoning: extractedReasoning || undefined,
							});
							continue;
						}
					}
					break;
				case 'brave':
					// Daniel style - faith-based commands
					if (/with faith|bravely|courageously/.test(cleanStep)) {
						const match = cleanStep.match(/(with faith|bravely|courageously) (go|move) (up|down|left|right)(?: (\d+))?/);
						if (match) {
							commands.push({
								type: 'move',
								direction: match[3] as keyof typeof DIRECTIONS,
								count: match[4] ? parseInt(match[4], 10) : 1,
								persona: persona.character,
								reasoning: extractedReasoning || undefined,
							});
							continue;
						}
					}
					break;
				case 'wise':
					// Solomon style - analytical commands
					if (/wisely|strategically|thoughtfully/.test(cleanStep)) {
						const match = cleanStep.match(/(wisely|strategically|thoughtfully) (go|move) (up|down|left|right)(?: (\d+))?/);
						if (match) {
							commands.push({
								type: 'move',
								direction: match[3] as keyof typeof DIRECTIONS,
								count: match[4] ? parseInt(match[4], 10) : 1,
								persona: persona.character,
								reasoning: extractedReasoning || undefined,
							});
							continue;
						}
					}
					break;
			}
		}
		
		// Standard movement parsing (works for all personas and examples)
		if (/go (up|down|left|right)/.test(cleanStep)) {
			const match = cleanStep.match(/go (up|down|left|right)(?: (\d+))?/);
			if (match) {
				commands.push({
					type: 'move',
					direction: match[1] as keyof typeof DIRECTIONS,
					count: match[2] ? parseInt(match[2], 10) : 1,
					reasoning: extractedReasoning || undefined,
				});
			}
		} else if (/eat/.test(cleanStep)) {
			const colorMatch = cleanStep.match(/(red|blue|green|yellow|gold) apple/);
			commands.push({
				type: 'eat',
				target: 'apple',
				color: colorMatch ? colorMatch[1] : undefined,
				reasoning: extractedReasoning || undefined,
			});
		} else if (/get (red|blue|green|yellow|gold|silver|bronze)? ?key/.test(cleanStep)) {
			const colorMatch = cleanStep.match(/get (red|blue|green|yellow|gold|silver|bronze)? ?key/);
			commands.push({
				type: 'get',
				target: 'key',
				color: colorMatch && colorMatch[1] ? colorMatch[1] : undefined,
				reasoning: extractedReasoning || undefined,
			});
		}
	}
	return commands;
}

function ExamplesDisplay({ examples, onStart }: { examples: ExamplePrompt[], onStart: () => void }) {
	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto shadow-xl">
				<div className="text-center mb-6">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
						📚 Study the Examples
					</h2>
					<p className="text-gray-600 dark:text-gray-300">
						Learn from these examples, then create your own prompt following the same pattern.
					</p>
				</div>
				
				<div className="space-y-4 mb-6">
					{examples.map((example, index) => (
						<div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
							<div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
								Scenario: {example.scenario}
							</div>
							<div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded p-3 mb-3">
								<div className="text-sm font-medium text-green-800 dark:text-green-200 mb-1">
									✅ Good Prompt:
								</div>
								<div className="text-green-700 dark:text-green-300 font-mono text-sm">
									&ldquo;{example.goodPrompt}&rdquo;
								</div>
							</div>
							<div className="text-sm text-gray-600 dark:text-gray-300">
								<strong>Why this works:</strong> {example.explanation}
							</div>
						</div>
					))}
				</div>
				
				<div className="text-center">
					<button
						onClick={onStart}
						className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
					>
						Start Level - Apply What You Learned! 🚀
					</button>
				</div>
			</div>
		</div>
	);
}

function PromptPythonGame() {
	/**
	 * Inventory holds collected keys. Keys are objects with at least a color property.
	 */
	interface Key {
		x: number;
		y: number;
		color?: string;
	}

	// State and game logic
	const [currentLevel, setCurrentLevel] = useState(0);
	const [snake, setSnake] = useState([...LEVELS[0].snake]);
	const [food, setFood] = useState([...LEVELS[0].food]);
	const [obstacles, setObstacles] = useState([...LEVELS[0].obstacles]);
	const [keys, setKeys] = useState<Key[]>([...LEVELS[0].keys]);
	const [inventory, setInventory] = useState<Key[]>([]);
	const [prompt, setPrompt] = useState('');
	const [feedback, setFeedback] = useState('');
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
	const [gameState, setGameState] = useState('playing');
	const [score, setScore] = useState(0);
	const [showOnboarding, setShowOnboarding] = useState(true);
	const [showExamples, setShowExamples] = useState(false);

	const level = LEVELS[currentLevel];

	// Show examples before level start for few-shot learning levels
	useEffect(() => {
		if (level && level.examples && level.examples.length > 0 && !showOnboarding) {
			setShowExamples(true);
		}
	}, [currentLevel, level, showOnboarding]);

	const handleStartLevel = () => {
		setShowExamples(false);
		setGameState('playing');
		setFeedback('');
		setPrompt('');
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const seen = localStorage.getItem('snakeGameOnboardingSeen');
			if (seen === 'true') {
				setShowOnboarding(false);
			}
		}
	}, []);

	function handleStartGame() {
		setShowOnboarding(false);
		if (typeof window !== 'undefined') {
			localStorage.setItem('snakeGameOnboardingSeen', 'true');
		}
	}

	// Utility functions
	function normalizePosition(pos: { x: number; y: number }) {
		return {
			x: Math.max(0, Math.min(GRID_SIZE - 1, pos.x)),
			y: Math.max(0, Math.min(GRID_SIZE - 1, pos.y)),
		};
	}

	function executeCommands(commands: Command[]) {
		const newSnake = [...snake];
		const newFood = [...food];
		const newKeys = [...keys];
		const newInventory = [...inventory];
		const currentLevelData = LEVELS[currentLevel];
		let success = false;
		let errorMessage = '';
		let reasoningFeedback = '';

		// Check reasoning requirement for chain-of-thought levels
		if (currentLevelData.reasoning?.requireExplanation) {
			const hasReasoning = commands.some(cmd => cmd.reasoning && cmd.reasoning.trim().length > 0);
			if (!hasReasoning) {
				setFeedback(`🤔 Solomon's wisdom requires explanation! Please include your reasoning using words like "because", "first I need to", "so I will", or "therefore". ${currentLevelData.lesson}`);
				setIsCorrect(false);
				return;
			} else {
				// Validate reasoning quality
				const reasoning = commands.find(cmd => cmd.reasoning)?.reasoning || '';
				if (reasoning.length < 10) {
					setFeedback(`🧠 Your reasoning is too brief! Solomon would provide deeper explanation. Try explaining why you chose this approach and what you're trying to achieve.`);
					setIsCorrect(false);
					return;
				}
				reasoningFeedback = `💭 Your reasoning: "${reasoning}" - `;
			}
		}

		for (const command of commands) {
			if (command.type === 'move') {
				const direction = DIRECTIONS[command.direction!];
				const count = command.count || 1;
				for (let i = 0; i < count; i++) {
					const currentHead = newSnake[0];
					const newHead = normalizePosition({
						x: currentHead.x + direction.x,
						y: currentHead.y + direction.y,
					});
					if (obstacles.some((obs) => obs.x === newHead.x && obs.y === newHead.y)) {
						// Enhanced reasoning-aware obstacle feedback
						if (currentLevelData.reasoning?.requireExplanation) {
							errorMessage = `🤔 Your reasoning was sound, but there's a practical obstacle! Solomon would reconsider the path when blocked. There's a wall at step ${i + 1}. Re-analyze and try a different approach.`;
						} else if (currentLevelData.persona) {
							switch (currentLevelData.persona.style) {
								case 'confident':
									errorMessage = `Even the mightiest king must find another path! There's a wall blocking your advance.`;
									break;
								case 'cautious':
									errorMessage = `Wise leadership requires careful planning! There's an obstacle ahead - consider a different route.`;
									break;
								case 'brave':
									errorMessage = `Faith moves mountains, but walls require wisdom! Find another path with courage.`;
									break;
								case 'wise':
									errorMessage = `True wisdom sees all paths! This route is blocked - strategically choose another way.`;
									break;
								default:
									errorMessage = `Oops! There's a wall at step ${i + 1}. Try a different path!`;
							}
						} else {
							errorMessage = `Oops! There's a wall at step ${i + 1}. Try a different path!`;
						}
						break;
					}
					newSnake.unshift(newHead);
					newSnake.pop();
				}
				if (errorMessage) break;
				success = true;
			} else if (command.type === 'eat') {
				let targetFound = false;
				if (command.target === 'apple' || command.target === 'any') {
					const head = newSnake[0];
					const targetFood = newFood.find(
						(f) =>
							f.x === head.x &&
							f.y === head.y &&
							(!command.color || f.color === command.color || typeof f.color === 'undefined')
					);
					if (targetFood) {
						if (command.color && targetFood.color && targetFood.color !== command.color) {
							errorMessage = `That's a ${targetFood.color} apple! Try asking for the ${targetFood.color} one.`;
							break;
						}
						newFood.splice(newFood.indexOf(targetFood), 1);
						newSnake.push(newSnake[newSnake.length - 1]);
						setScore((prev) => prev + 10);
						targetFound = true;
						success = true;
					}
				}
				if (command.target === 'key' || command.target === 'any') {
					const head = newSnake[0];
					const targetKey = newKeys.find(
						(k) => k.x === head.x && k.y === head.y && (!command.color || k.color === command.color)
					);
					if (targetKey) {
						if (command.color && targetKey.color !== command.color) {
							errorMessage = `That's a ${targetKey.color} key! Try asking for the ${targetKey.color} one.`;
							break;
						}
						newKeys.splice(newKeys.indexOf(targetKey), 1);
						newInventory.push(targetKey);
						targetFound = true;
						success = true;
					}
				}
				if (!targetFound) {
					if (command.color) {
						errorMessage = `I don't see a ${command.color} ${command.target} here. Make sure you move to it first!`;
					} else {
						errorMessage = `I don't see a ${command.target} here. Make sure you move to it first!`;
					}
					break;
				}
			}
		}
		if (errorMessage) {
			setFeedback(reasoningFeedback + errorMessage);
			setIsCorrect(false);
			return;
		}
		if (success) {
			setSnake(newSnake);
			setFood(newFood);
			setKeys(newKeys);
			setInventory(newInventory);
			// Check win condition
			if (newFood.length === 0) {
				setGameState('won');
				// Enhanced reasoning-aware victory feedback
				if (currentLevelData.reasoning?.requireExplanation) {
					setFeedback(`🎉 ${reasoningFeedback}Excellent reasoning and execution! Solomon would be proud of your systematic thinking. Click "Next Level" to tackle even more complex challenges!`);
				} else if (currentLevelData.persona) {
					switch (currentLevelData.persona.character) {
						case 'King David':
							setFeedback('🎉 Victorious! You commanded with the courage of a true king! Click "Next Level" to continue your royal quest.');
							break;
						case 'Moses':
							setFeedback('🎉 Well led! Your careful guidance brought your people to safety! Click "Next Level" to continue the journey.');
							break;
						case 'Daniel':
							setFeedback('🎉 Faithful victory! Your courage in the face of danger has been rewarded! Click "Next Level" to continue trusting.');
							break;
						case 'Solomon':
							setFeedback('🎉 Wisdom prevails! Your strategic thinking has led to success! Click "Next Level" to gain more understanding.');
							break;
						default:
							setFeedback('🎉 Amazing! You completed the level! Click "Next Level" to continue.');
					}
				} else {
					setFeedback('🎉 Amazing! You completed the level! Click "Next Level" to continue.');
				}
				setIsCorrect(true);
			} else {
				// Enhanced reasoning-aware progress feedback
				if (currentLevelData.reasoning?.requireExplanation) {
					setFeedback(`✅ ${reasoningFeedback}Your reasoning is sound and your execution is precise! Continue with the same thoughtful approach!`);
				} else if (currentLevelData.persona) {
					switch (currentLevelData.persona.style) {
						case 'confident':
							setFeedback('Excellent advance! Press forward with royal confidence!');
							break;
						case 'cautious':
							setFeedback('Wise movement! Continue with careful leadership!');
							break;
						case 'brave':
							setFeedback('Courageous step! Keep moving with faith!');
							break;
						case 'wise':
							setFeedback('Strategic progress! Continue with thoughtful planning!');
							break;
						default:
							setFeedback('Great job! Keep going!');
					}
				} else {
					setFeedback('Great job! Keep going!');
				}
				setIsCorrect(true);
			}
		} else {
			setFeedback(`I'm not sure what you want me to do. ${currentLevelData.lesson}`);
			setIsCorrect(false);
		}
	}

	function handleSubmit() {
		if (!prompt.trim()) return;
		const currentLevelData = LEVELS[currentLevel];
		const requireReasoning = currentLevelData.reasoning?.requireExplanation || false;
		const commands = parsePrompt(prompt, currentLevelData.persona, requireReasoning);
		if (commands.length === 0) {
			if (requireReasoning) {
				setFeedback(`🤔 I need both clear instructions AND your reasoning! Like Solomon, explain your thinking using "because", "first I need to", or "therefore". ${currentLevelData.lesson}`);
			} else {
				setFeedback(`I don't understand. ${currentLevelData.lesson}`);
			}
			setIsCorrect(false);
			return;
		}
		executeCommands(commands);
		setPrompt('');
	}

	function nextLevel() {
		if (currentLevel < LEVELS.length - 1) {
			setCurrentLevel((prev) => prev + 1);
			const level = LEVELS[currentLevel + 1];
			setSnake([...level.snake]);
			setFood([...level.food]);
			setObstacles([...level.obstacles]);
			setKeys([...level.keys]);
			setInventory([]);
			setFeedback('');
			setIsCorrect(null);
			setGameState('playing');
			setPrompt('');
			setScore(0);
		} else {
			setGameState('completed');
		}
	}

	function resetLevel() {
		const level = LEVELS[currentLevel];
		setSnake([...level.snake]);
		setFood([...level.food]);
		setObstacles([...level.obstacles]);
		setKeys([...level.keys]);
		setInventory([]);
		setFeedback('');
		setIsCorrect(null);
		setGameState('playing');
		setPrompt('');
		setScore(0);
	}

	function renderCell(x: number, y: number) {
		const isSnakeHead = snake[0] && snake[0].x === x && snake[0].y === y;
		const isSnakeBody = snake.slice(1).some((segment) => segment.x === x && segment.y === y);
		const cellFood = food.find((f) => f.x === x && f.y === y);
		const cellKey = keys.find((k) => k.x === x && k.y === y);
		const isObstacle = obstacles.some((obs) => obs.x === x && obs.y === y);
		let cellClass =
			'w-16 h-16 border-2 border-purple-200 flex items-center justify-center text-2xl transition-all duration-300';
		let content = '';
		if (isObstacle) {
			cellClass += ' bg-gray-400';
			content = '🧱';
		} else if (isSnakeHead) {
			cellClass += ' bg-green-400 animate-bounce';
			content = '🐍';
		} else if (isSnakeBody) {
			cellClass += ' bg-green-300';
			content = '●';
		} else if (cellFood) {
			cellClass += ` bg-${cellFood.color || 'red'}-200 animate-pulse`;
			content = '🍎';
		} else if (cellKey) {
			cellClass += ` bg-${cellKey.color || 'gray'}-200 animate-pulse`;
			content = '🗝️';
		} else {
			cellClass += ' bg-purple-50 hover:bg-purple-100';
		}
		return (
			<div key={`${x}-${y}`} className={cellClass}>
				{content}
			</div>
		);
	}

	if (gameState === 'completed') {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 flex items-center justify-center p-4">
				<div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md">
					<div className="text-6xl mb-4">🎉</div>
					<h1 className="text-3xl font-bold text-purple-800 mb-4">Congratulations!</h1>
					<p className="text-gray-600 mb-6">
						You learned how to give clear, specific instructions - just like real prompt engineers!
					</p>
					<button
						onClick={() => {
							setCurrentLevel(0);
							resetLevel();
							setGameState('playing');
						}}
						className="bg-purple-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-purple-600 transition-colors"
					>
						Play Again
					</button>
				</div>
			</div>
		);
	}

	// Main game screen
	return (
		<>
			{showOnboarding && (
				<SnakeGameOnboarding open={showOnboarding} onStart={handleStartGame} />
			)}
			{showExamples && level.examples && (
				<ExamplesDisplay examples={level.examples} onStart={handleStartLevel} />
			)}
			{!showOnboarding && !showExamples && (
				<div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 flex items-center justify-center p-4">
					<div className="w-full max-w-4xl mx-auto">
						<div className="text-center mb-6">
							<h1 className="text-4xl font-bold text-white mb-2">🐍 Prompt the Python</h1>
							<div className="bg-white rounded-2xl p-4 shadow-lg">
								<h2 className="text-xl font-bold text-purple-800">
									Level {currentLevel + 1}: {LEVELS[currentLevel].title}
								</h2>
								<p className="text-purple-600">{LEVELS[currentLevel].description}</p>
								<p className="text-sm text-gray-600 mt-2">Goal: {LEVELS[currentLevel].goal}</p>
								
								{/* Persona Information Display */}
								{LEVELS[currentLevel].persona && (
									<div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-yellow-300">
										<div className="flex items-center justify-center gap-2 mb-2">
											<span className="text-2xl">
												{LEVELS[currentLevel].persona?.character === 'King David' && '👑'}
												{LEVELS[currentLevel].persona?.character === 'Moses' && '🏔️'}
												{LEVELS[currentLevel].persona?.character === 'Daniel' && '🦁'}
												{LEVELS[currentLevel].persona?.character === 'Solomon' && '💎'}
											</span>
											<h3 className="text-lg font-bold text-yellow-800">
												Channel {LEVELS[currentLevel].persona?.character}
											</h3>
										</div>
										<p className="text-sm text-yellow-700 mb-2">
											{LEVELS[currentLevel].persona?.description}
										</p>
										<p className="text-xs text-yellow-600 font-medium">
											💡 {LEVELS[currentLevel].persona?.commandStyle}
										</p>
									</div>
								)}
								
								{/* Reasoning Requirement Display */}
								{LEVELS[currentLevel].reasoning?.requireExplanation && (
									<div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border-2 border-blue-300">
										<div className="flex items-center justify-center gap-2 mb-2">
											<span className="text-2xl">🧠</span>
											<h3 className="text-lg font-bold text-blue-800">
												Chain-of-Thought Required
											</h3>
										</div>
										<p className="text-sm text-blue-700 mb-2">
											Explain your reasoning like Solomon would - think step by step!
										</p>
										<p className="text-xs text-blue-600 font-medium">
											💭 Use: &ldquo;First I need to..., then I will..., because...&rdquo;
										</p>
									</div>
								)}
								
								{/* Module Badge */}
								<div className="mt-3 flex justify-center">
									<span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
										Module {LEVELS[currentLevel].module}: {
											LEVELS[currentLevel].module === 1 ? 'Basic Prompting' :
											LEVELS[currentLevel].module === 2 ? 'Specificity' :
											LEVELS[currentLevel].module === 3 ? 'Persona' :
											LEVELS[currentLevel].module === 4 ? 'Examples' :
											LEVELS[currentLevel].module === 5 ? 'Chain-of-Thought' : 'Advanced'
										}
									</span>
								</div>
							</div>
						</div>
						<div className="grid md:grid-cols-2 gap-6">
							{feedback && (
								<div className="md:col-span-2">
									<div
										className={`p-4 rounded-xl text-center ${
											isCorrect ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
										}`}
									>
										<p className="font-medium text-lg">{feedback}</p>
									</div>
								</div>
							)}
							<div className="bg-white rounded-2xl p-6 shadow-lg">
								<div className="grid grid-cols-5 gap-1 mb-4 max-w-xs mx-auto">
									{Array.from({ length: GRID_SIZE }, (_, y) =>
										Array.from({ length: GRID_SIZE }, (_, x) => renderCell(x, y))
									)}
								</div>
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<Star className="w-5 h-5 text-yellow-500" />
										<span className="font-bold">Score: {score}</span>
									</div>
									{inventory.length > 0 && (
										<div className="flex items-center gap-2">
											<span className="text-sm">Keys: </span>
											{inventory.map((key, i) => (
												<div key={i} className={`w-6 h-6 bg-${key.color || 'gray'}-300 rounded`}>
													🗝️
												</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg">
								<h3 className="text-lg font-bold text-purple-800 mb-4">Give the Snake Instructions:</h3>
								<div className="mb-4">
									<div className="flex gap-2">
										<input
											type="text"
											value={prompt}
											onChange={(e) => setPrompt(e.target.value)}
											onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
											placeholder="Type your complete instruction..."
											className="flex-1 p-3 border-2 border-purple-200 rounded-xl focus:border-purple-400 outline-none text-lg"
										/>
										<button
											onClick={handleSubmit}
											className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
										>
											Go!
										</button>
									</div>
								</div>
								<div className="flex gap-2">
									<button
										onClick={resetLevel}
										className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors"
									>
										<RotateCcw className="w-4 h-4" />
										Reset
									</button>
									{gameState === 'won' && (
										<button
											onClick={nextLevel}
											className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-600 transition-colors"
										>
											{currentLevel < LEVELS.length - 1 ? 'Next Level' : 'Finish Game'}
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default PromptPythonGame;