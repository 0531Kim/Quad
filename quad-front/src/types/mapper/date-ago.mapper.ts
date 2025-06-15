export function dateAgoMapper(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 10) return "Just now";
  if (diffMin < 1) return "Just now";
  if (diffMin === 1) return "A minute ago";
  if (diffMin < 60) return `${diffMin} minutes ago`;
  if (diffHour === 1) return "An hour ago";
  if (diffHour < 24) return `${diffHour} hours ago`;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thatDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.floor((today.getTime() - thatDay.getTime()) / (1000 * 60 * 60 * 24));
  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";
  if (dayDiff < 7) return `${dayDiff} days ago`;

  if (diffWeek === 1) return "Last week";
  if (diffWeek < 4) return `${diffWeek} weeks ago`;

  if (diffMonth === 1) return "Last month";
  if (diffMonth < 4) return `${diffMonth} months ago`;
  if (diffMonth < 12) return "Earlier this month";

  if (diffYear === 1) return "Last year";
  if (diffYear < 3) return `${diffYear} years ago`;
  return "This year";
} 