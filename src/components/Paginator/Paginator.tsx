import React, { useState } from 'react'
import { v1 } from 'uuid'
import styles from './Paginator.module.css'

export type PaginatorPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  portionSize: number
  onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({ totalUsersCount, pageSize, currentPage, portionSize, onPageChanged }: PaginatorPropsType) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize)
  const portionsCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState<number>(1)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionPageNumber = portionNumber * portionSize

  const pages: number[] = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  return <div className={styles.paginator}>
        {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>}
        {pages
          .filter(el => el >= leftPortionPageNumber && el <= rightPortionPageNumber)
          .map(el => <span key={v1()}
                             className={currentPage === el ? styles.selectedPage : ''}
                             onClick={(event) => onPageChanged(el)}>{el}</span>)}
        {portionNumber < portionsCount && <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>}
    </div>
}
