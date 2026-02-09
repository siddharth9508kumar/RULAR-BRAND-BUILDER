
import React from 'react';
import { ProjectCategory, ProjectOption } from './types';

export const PROJECT_OPTIONS: ProjectOption[] = [
  {
    id: ProjectCategory.WOMAN_OWNED,
    title: "Woman-Led Small Business",
    description: "Promote a local stitching center, beauty parlour, or retail shop run by a woman entrepreneur.",
    colors: ["#F9D3B4", "#D8BFD8", "#FFF9C4"],
    fonts: "Handwritten or Simple Elegant (e.g., Handlee, Playfair)",
    logoIdeas: ["Sewing machine", "Mirror", "Shopping bag", "Thread & Needle"],
    icon: "fa-person-dress"
  },
  {
    id: ProjectCategory.GOVT_SCHOOL,
    title: "Government School Awareness",
    description: "Increase awareness and admissions for a local government school to build trust in education.",
    colors: ["#2196F3", "#4CAF50", "#FFEB3B", "#FFFFFF"],
    fonts: "Bold, clear, easy-to-read fonts",
    logoIdeas: ["School building", "Stack of books", "Pencil", "Open hands"],
    icon: "fa-school"
  },
  {
    id: ProjectCategory.FARM_PRODUCT,
    title: "Farmer-Led Product",
    description: "Market organic vegetables, homemade pickles, or agricultural innovations from local farms.",
    colors: ["#43A047", "#8D6E63", "#F5F5DC", "#FFB300"],
    fonts: "Simple fonts with a natural feel",
    logoIdeas: ["Leaf", "Farm field", "Basket of produce", "Sprouting plant"],
    icon: "fa-leaf"
  },
  {
    id: ProjectCategory.CROWDFUNDING,
    title: "Crowdfunding for Need",
    description: "Support someone's education or medical emergency through a caring community campaign.",
    colors: ["#BBDEFB", "#E1BEE7", "#F5F5F5", "#F8BBD0"],
    fonts: "Clear, friendly fonts that feel respectful",
    logoIdeas: ["Heart", "Helping hands", "Donation box", "Open book"],
    icon: "fa-hand-holding-heart"
  },
  {
    id: ProjectCategory.COMMUNITY_AWARENESS,
    title: "Community Awareness",
    description: "Organize plantation drives, clean-up events, or scam awareness campaigns.",
    colors: ["#66BB6A", "#FF7043", "#F44336", "#1A237E"],
    fonts: "Strong, attention-grabbing heading fonts",
    logoIdeas: ["Trees", "Megaphone", "Group of people", "Shield icon"],
    icon: "fa-users"
  }
];
