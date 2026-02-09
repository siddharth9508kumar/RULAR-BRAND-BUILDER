
export enum ProjectCategory {
  WOMAN_OWNED = 'WOMAN_OWNED',
  GOVT_SCHOOL = 'GOVT_SCHOOL',
  FARM_PRODUCT = 'FARM_PRODUCT',
  CROWDFUNDING = 'CROWDFUNDING',
  COMMUNITY_AWARENESS = 'COMMUNITY_AWARENESS'
}

export interface ProjectOption {
  id: ProjectCategory;
  title: string;
  description: string;
  colors: string[];
  fonts: string;
  logoIdeas: string[];
  icon: string;
}

export interface BrandState {
  category: ProjectCategory | null;
  businessName: string;
  slogan: string;
  description: string;
  colors: string[];
  headingFont: string;
  bodyFont: string;
  logoUrl: string | null;
  posterUrl: string | null;
}

export interface BrandSuggestions {
  colors: string[];
  slogan: string;
  description: string;
  headingFont: string;
  bodyFont: string;
}
