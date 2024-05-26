import { BookMark, LocalData } from "../types";

// 즐겨찾기 설정.
// {광역지역명, 세부지역명} 객체의 배열로 즐겨찾기 로컬 저장.
export const setBookmark = (isAdd: boolean, metro: string, local: string) => {
  const bookmarkData = localStorage.getItem("bookmark");
  let bookmarks: BookMark[] = [];
  if(bookmarkData !== null)
  {
    bookmarks = JSON.parse(bookmarkData);
  }

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
  const bookmarkData = localStorage.getItem("bookmark");
  if(bookmarkData !== null)
  {
    return JSON.parse(bookmarkData);
  }
  else
  {
    return [];
  }
}

// 즐겨찾기 지역인지 확인.
export const getIsBookmarked = (data: LocalData): boolean => {
  const bookmarkData = localStorage.getItem("bookmark");
  if(bookmarkData !== null)
  {
    const bookmarks: BookMark[] = JSON.parse(bookmarkData);
    return bookmarks !== null && bookmarks.some((b: BookMark) => b.metro === data.sidoName && b.local === data.cityName);
  }
  else
  {
    return false;
  }  
}

// 내 지역 반환.
export const getMyRegion = (): BookMark => {
  const myRegionData = localStorage.getItem("myRegion");
  if(myRegionData !== null)
  {
    return JSON.parse(myRegionData);
  }
  else
  {
    return { 
      metro: "",
      local: "" 
    };
  }
}

// 내 지역 인지 확인.
export const getIsMyRegion = (data: LocalData) => {
  const myRegionData = localStorage.getItem("myRegion");
  if(myRegionData !== null)
  {
    const myRegion: BookMark = JSON.parse(localStorage.getItem("myRegion") || '');
    return myRegion !== null && myRegion.metro === data.sidoName && myRegion.local === data.cityName;
  }
  else
  {
    return false;
  }
}

// 내 지역 로컬 저장.
export const setMyRegion = (metro: string, local: string) => {
  const data: BookMark = {
    metro: metro,
    local: local
  };
  localStorage.setItem("myRegion", JSON.stringify(data));
}