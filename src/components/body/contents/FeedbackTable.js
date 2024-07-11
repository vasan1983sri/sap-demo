import React, { useEffect, useMemo, useState } from 'react'
import { usePagination, useSortBy, useTable, useRowSelect, useMountedLayoutEffect } from 'react-table'
import { useSticky } from 'react-table-sticky'
import FBTable from '../table/FeedbackData.json'
import { FEEDBACK_COLUMNS } from '../table/TableColumns'
import '../table/table.css'
import { Checkbox } from './Checkbox'

export default function FeedbackTable({ messages, pageInitialValue, selectFBMessage, setSelectFBMessage }) {


  const columns = React.useMemo(() => FEEDBACK_COLUMNS, [FEEDBACK_COLUMNS])
  const data = React.useMemo(() => messages, [messages])
  const { getTableProps, getTableBodyProps, headerGroups, page, previousPage, nextPage, canPreviousPage, canNextPage, pageOptions, gotoPage, pageCount, setPageSize, state, prepareRow, selectedFlatRows } =
    useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 5 } }, useSortBy, usePagination, useRowSelect, (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (<Checkbox {...row.getToggleRowSelectedProps()} />)
          },
          ...columns
        ]
        
      })
    }
    );

  const { pageIndex, pageSize } = state

  useMountedLayoutEffect(() => {
    setSelectFBMessage && setSelectFBMessage(selectedFlatRows);
  }, [setSelectFBMessage, selectedFlatRows]);

 
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(
                    (column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}  <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                      </th>
                    ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }
              </tr>
            )
          })}

        </tbody>

      </table>
      <div style={{ justifyContent: 'center' }}>
        <span>
          Page {' '}
          <strong>
            {pageIndex + pageInitialValue} </strong> of {pageOptions.length}
        </span> {' '}

        <span>
          | Go to Page: {' '}
          <input type='number' defaultValue={pageIndex + pageInitialValue} value={pageIndex + pageInitialValue}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            disabled={!canPreviousPage && !canNextPage}
          ></input>
        </span> {' '}
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} disabled={!canPreviousPage && !canNextPage} >
          {
            [5, 10, 25].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))
          }
        </select> {' '}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button> {' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button> {' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
      <pre>
        <code>
          {
            JSON.stringify(
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original),
              }, null, 2
            )
          }
        </code>
      </pre>
    </>
  )
}
