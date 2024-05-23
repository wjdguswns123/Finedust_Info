import { BookMark, LocalData } from "../types";

// 즐겨찾기 설정.
// {광역지역명, 세부지역명} 객체의 배열로 즐겨찾기 로컬 저장.
export const setBookmark = (isAdd: boolean, metro: string, local: string) => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmark") || '');
  let newBookmarks: BookMark[];

  if(isAdd)
  {
    const newBookmark: BookMark = {
      metro: metro,
      local: local
    };
    newBookmarks = bookmarks !== null ? [...bookmarks, newBookmark] : [newBookmark];
  }
  else
  {
    newBookmarks = bookmarks.filter((m: BookMark) => !(m.metro === metro && m.local === local));
  }

  localStorage.setItem("bookmark", JSON.stringify(newBookmarks));
}

// 즐겨찾기 데이터 반환.
export const getBookmark = (): BookMark[] => {
  return JSON.parse(localStorage.getItem("bookmark") || '');
}

// 즐겨찾기 지역인지 확인.
export const getIsBookmarked = (data: LocalData): boolean => {
  const bookmarks: BookMark[] = JSON.parse(localStorage.getItem("bookmark") || '');
  return bookmarks !== null && bookmarks.some((b: BookMark) => b.metro === data.sidoName && b.local === data.cityName);
}

// 내 지역 반환.
export const getMyRegion = (): BookMark => {
  return JSON.parse(localStorage.getItem("myRegion") || '');
}

// 내 지역 인지 확인.
export const getIsMyRegion = (data: LocalData) => {  
  const myRegion: BookMark = JSON.parse(localStorage.getItem("myRegion") || '');
  return myRegion !== null && myRegion.metro === data.sidoName && myRegion.local === data.cityName;
}

// 내 지역 로컬 저장.
export const setMyRegion = (metro: string, local: string) => {
  const data: BookMark = {
    metro: metro,
    local: local
  };
  localStorage.setItem("myRegion", JSON.stringify(data));
}