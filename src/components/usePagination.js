import { useMemo } from "react";

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  // returns array of number of pages from start to finish
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    
    const totalPageNumbers = siblingCount + 5;
    
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSibIdx = Math.max(currentPage - siblingCount, 1);
    const rightSibIdx = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSibIdx > 2;
    const shouldShowRightDots = rightSibIdx < totalPageCount - 2;

    const firstPageIdx = 1;
    const lastPageIdx = totalPageCount;

    if(!shouldShowLeftDots && shouldShowRightDots){
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    if(shouldShowLeftDots && !shouldShowRightDots){
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIdx, DOTS, ...rightRange];
    }

    if(shouldShowLeftDots && shouldShowRightDots){
      let middleRange = range(leftSibIdx, rightSibIdx);
      return [firstPageIdx,DOTS,...middleRange, DOTS, lastPageIdx];
    }
  }, [totalCount,
    pageSize,
    siblingCount,
    currentPage,
  ]);
  return paginationRange;
};
