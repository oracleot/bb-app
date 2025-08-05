'use client';

import React, { useState } from 'react';
import { RotateCcw, Star } from 'lucide-react';

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

// Update LEVELS to use Food[] type for food
const LEVELS = [
	{
		id: 1,
		title: 'First Steps',
		description: 'Give the snake a complete instruction to get the apple!',
		goal: 'Go to the apple and eat it',
		snake: [{ x: 2, y: 2 }],
		food: [{ x: 4, y: 2, type: 'apple' } as Food],
		obstacles: [],
		gates: [],
		keys: [],
		lesson: "Try: 'go right 2 times then eat apple' - give complete instructions!",
	},
	{
		id: 2,
		title: 'Around Obstacles',
		description: 'Navigate around the wall with one instruction',
		goal: 'Get the apple, but avoid the wall',
		snake: [{ x: 1, y: 2 }],
		food: [{ x: 4, y: 1, type: 'apple' } as Food],
		obstacles: [{ x: 3, y: 2 }],
		gates: [],
		keys: [],
		lesson: "Try: 'go up 1 time, then go right 3 times, then go down 1 time, then eat apple'",
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
	},
	{
		id: 4,
		title: 'Multi-Step Plans',
		description: 'Plan the whole journey: get the key, then the apple',
		goal: 'Get the key, then the apple',
		snake: [{ x: 0, y: 2 }],
		food: [{ x: 4, y: 0, type: 'apple' } as Food],
		obstacles: [{ x: 2, y: 1 }, { x: 2, y: 3 }],
		gates: [],
		keys: [{ x: 1, y: 0, color: 'blue' }],
		lesson: "Try: 'go up 2 times, then go right 1 time, then get key, then go right 3 times, then eat apple'",
	},
];

// Example parsePrompt function (with "then" split fix):
type Command = {
	type: 'move' | 'eat' | 'get';
	direction?: keyof typeof DIRECTIONS;
	count?: number;
	target?: string;
	color?: string;
};

function parsePrompt(prompt: string): Command[] {
	// Split by 'then' for multi-step instructions
	const steps = prompt.toLowerCase().split(/\s*then\s*/);
	const commands: Command[] = [];
	for (const step of steps) {
		// Basic parsing for movement and actions
		if (/go (up|down|left|right)/.test(step)) {
			const match = step.match(/go (up|down|left|right)(?: (\d+))?/);
			if (match) {
				commands.push({
					type: 'move',
					direction: match[1] as keyof typeof DIRECTIONS,
					count: match[2] ? parseInt(match[2], 10) : 1,
				});
			}
		} else if (/eat/.test(step)) {
			const colorMatch = step.match(/(red|blue|green|yellow) apple/);
			commands.push({
				type: 'eat',
				target: 'apple',
				color: colorMatch ? colorMatch[1] : undefined,
			});
		} else if (/get key/.test(step)) {
			const colorMatch = step.match(/(red|blue|green|yellow) key/);
			commands.push({
				type: 'get',
				target: 'key',
				color: colorMatch ? colorMatch[1] : undefined,
			});
		}
	}
	return commands;
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
		let success = false;
		let errorMessage = '';

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
						errorMessage = `Oops! There's a wall at step ${i + 1}. Try a different path!`;
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
			setFeedback(errorMessage);
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
				setFeedback('🎉 Amazing! You completed the level! Click "Next Level" to continue.');
				setIsCorrect(true);
			} else {
				setFeedback('Great job! Keep going!');
				setIsCorrect(true);
			}
		} else {
			setFeedback(`I'm not sure what you want me to do. ${LEVELS[currentLevel].lesson}`);
			setIsCorrect(false);
		}
	}

	function handleSubmit() {
		if (!prompt.trim()) return;
		const commands = parsePrompt(prompt);
		if (commands.length === 0) {
			setFeedback(`I don't understand. ${LEVELS[currentLevel].lesson}`);
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
	);
}

export default PromptPythonGame;