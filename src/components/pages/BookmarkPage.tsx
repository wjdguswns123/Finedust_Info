import React from 'react'
import { getBookmark } from '../../datas/localStorageDatas';
import BookmarkCard from '../BookmarkCard';
import { getLocalData } from '../../actions/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { LocalData } from '../../types';
import { RootState } from '../../reducers';

const BookmarkPage = () => {
  const dispatch = useDispatch();
  const localDatas = useSelector((state: RootState) => state.localData);

  // 즐겨찾기 등록된 지역의 데이터가 store에 없으면 데이터 요청.
  const bookmarks = getBookmark();
  let newDatas = [...localDatas];
  if (bookmarks !== null && bookmarks.length > 0) {
    let count = 0;
    bookmarks.map((bookmark) => {
      const data = localDatas.find((data: LocalData) => data.sidoName === bookmark.metro && data.cityName === bookmark.local);
      if (data === undefined) {
        count += 1;
        getLocalData(bookmark.metro, (data) => {
          newDatas = [...newDatas, ...data];
          count -= 1;

          // 요청한 데이터가 모두 왔으면, store에 데이터 업데이트.
          if (count === 0) {
            dispatch({ type: "ADD_DATA", value: newDatas });
          }
        });
      }
    });

    // 요청한 데이터가 없으면, 바로 렌더링.
    if (count === 0) {
      return draw();
    }
  }
  else {
    // 즐겨찾기한 지역이 없으면, 바로 렌더링.
    return draw();
  }


  // 즐겨찾기 그리기.
  function drawBookmarkTab() {
    const bookmarks = getBookmark();

    if (bookmarks !== null && bookmarks.length > 0) {
      return (<ul className="bookmark-cards">
        {bookmarks.map((bookmark, index) => {
          return (
            <BookmarkCard key={index} bookmark={bookmark} />);
        })}
      </ul>);
    }
    else {
      return (
        <div className="no-bookmark">
          즐겨찾기 한 지역이 없습니다.
        </div>);
    }
  }

  function draw() {
    return (
      <div className="bookmark-background">
        {drawBookmarkTab()}
      </div>
    );
  }
}

export default BookmarkPage;