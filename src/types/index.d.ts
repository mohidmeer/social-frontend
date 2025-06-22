export type SocialAccount = {
    _id: string;
    name: string;
    platform: string;
    pages: any;
    avatar_url: string;
    posts_made:number,
    linked_schedules:number
};

export type HistoryStatus = {
    type: 'success' | 'failed';
    message: string;
  };
  
  export type HistoryItem = {
    _id: string;
    user_id: string;
    social_account_id: {
      name:string,
      avatar_url:string 
    };
    schedule_id: string;
    caption_instructions: string;
    image_instructions: string;
    platform: 'facebook' | 'instagram' | 'twitter' | string;
    generated_caption: string;
    status: HistoryStatus;
    createdAt: string;
    updatedAt: string;
    post_url:string;
  };

  export type Schedule = {
    _id: string;
    user_id: string;
    active: boolean;
    last_run: {
      time: string | null;
      message: string | null;
      error: boolean;
      post_url:string;
    };
    title: string;
    caption_instructions: string;
    image_instructions: string;
    platform: 'facebook' | 'instagram' | 'twitter' | string; // adjust based on SOCIAL_MEDIA_PLATFORMS
    schedule: string;
    social_account_id: string  | SocialAccount;
    page?: {
      name: string;
      access_token: string;
      id: string;
      picture?: string;
    };
    createdAt: string;
    updatedAt: string;
  };

 export type DashboardStats = {
    totalSchedules: number
    activeSchedules: number
    pausedSchedules: number
    totalPosts: number
    failedPosts: number
    connectedAccounts: number
  }