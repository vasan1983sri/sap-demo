import React, { useMemo, useState } from 'react'
import { usePagination, useSortBy, useTable, useRowSelect } from 'react-table'
import FBTable from '../table/FeedbackData.json'
import { FEEDBACK_COLUMNS } from '../table/TableColumns'
import '../table/table.css'
import { Checkbox } from './Checkbox'

export default function SampleTable() {


  const FEEDBACK_COLUMNS_SAMPLE = [
    {
      Header: 'Id',
      accessor: 'id'
    },
    {
      Header: 'Name',
      accessor: 'flName'
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber'
    },
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'Message',
      accessor: 'fbMessage'
    },
    {
      Header: 'Created On',
      accessor: 'updt_ts'
    },
  ]
  const columns = useMemo(() => FEEDBACK_COLUMNS_SAMPLE, [])
  const [pageNumber, setPageNumber] = useState(1)
  const data = useMemo(() => FBTable, [])
  const { getTableProps, getTableBodyProps, headerGroups, page, previousPage, nextPage, canPreviousPage, canNextPage, pageOptions, state, gotoPage, pageCount, prepareRow, selectedFlatRows } = useTable({ columns, data, initialState: {pageIndex: 0} }, 
    useSortBy, usePagination, useRowSelect, (hooks) => {hooks.visibleColumns.push((columns)=>{
      return [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps  }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({row}) => (
            <Checkbox {...row.getToggleRowSelectedProps()} />
          )
        },
        ...columns
      ]
    })});
  const { pageIndex } = state


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
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')} <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''} </span>
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
      <div>
        <span> Page {' '}
          {pageIndex + 1 } of {pageOptions.length} { ' '}
        </span>
        <span>
           | Go to page: {' '}
           <input type='number' defaultValue={pageIndex+1} onChange={ e => {
            const num = e.target.value;
            const pageNumber = num ? Number(num) : 0
            setPageNumber(pageNumber)
            gotoPage(pageNumber)
           }}></input>
        </span>
       
        <button onClick={() => gotoPage(pageNumber)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        <span>
          Printing Page Number -  {pageNumber}
        </span>
      </div>
      <pre>
        <code>
          {
            JSON.stringify (
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original),
              },
              null, 2
            )
          }
        </code>
      </pre>
    </>
  )
}
