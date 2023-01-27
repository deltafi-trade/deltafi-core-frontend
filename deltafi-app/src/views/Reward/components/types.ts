export interface CardProps {
  caption?: string;
  detail?: string;
  image?: string;
}

interface RewardHistoryRow {
  date?: string;
  rewards?: number;
  lockup?: number;
}

interface MyRewardObject {
  name?: string; // REFERAL
  totalAmount?: number;
  claimedAmount?: number;
  claimed?: number;
  history?: Array<RewardHistoryRow>;
}

export interface MyRewardProps {
  detail: MyRewardObject;
}
