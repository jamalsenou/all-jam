import { clsx, type ClassValue } from "clsx"
import { collection, getDocs } from "firebase/firestore";
import { twMerge } from "tailwind-merge"
import { db, model } from "./firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//TODO: implement time range
export const getTopContributors = async(snapshot) => {
  const users = snapshot.docs.map(doc => doc.data())
  const sortedUsers = users.sort((a, b) => b.points - a.points);
  return sortedUsers;
};

// Wrap in an async function so you can use await
export const AIName = async(display_name, existingNicknames) => {
  // Provide a prompt that contains text
  const prompt = `return a retro, funny, music related nickname for ${display_name}, return the name and nothing else`

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  return text;
}

// Function to check if token is expired
export const isTokenExpired = (tokenExpiry) => {
  if (!tokenExpiry) return true;
  return Date.now() > parseInt(tokenExpiry);
};

// Wrap in an async function so you can use await
export const AIFact = async(song) => {
  // Provide a prompt that contains text
  const prompt = `return an interesting fact about the following song: ${song}, return a single sentence fact and nothing else, don't start with despite`

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  return text;
}

// Wrap in an async function so you can use await
export const AIGenre = async(song) => {
  // Provide a prompt that contains text
  const prompt = `return the genre of the following song: ${song}, return just the genre and nothing else`

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  return text;
}

// Wrap in an async function so you can use await
export const AIRelease = async(song) => {
  // Provide a prompt that contains text
  const prompt = `return the release year of the following song: ${song}, return just the release year and nothing else`

  // To generate text output, call generateContent with the text input
  const result = await model.generateContent(prompt);

  const response = result.response;
  const text = response.text();
  return text;
}

export const getAllBadges = async() => {
  const collectionRef = collection(db, "badges")
  const snapshot = await getDocs(collectionRef)
  const badges = snapshot.docs.map(doc => doc.data())
  return badges;
}