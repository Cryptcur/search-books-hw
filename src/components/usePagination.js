import { useMemo } from "react";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount,
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

    const firstPageIdx = 1;
    const lastPageIdx = totalPageCount;

    let middleRange = range(leftSibIdx, rightSibIdx);

    return [
      firstPageIdx,
      middleRange,
      lastPageIdx,
    ];
  }, [totalCount,
    pageSize,
    siblingCount,
    currentPage,]);
  return paginationRange;
};
