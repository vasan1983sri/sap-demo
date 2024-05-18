import React, { useMemo, useState } from 'react'
import { useTable } from 'react-table'
import FBTable from '../table/FeedbackData.json'
import { FEEDBACK_COLUMNS } from '../table/TableColumns'
import '../table/table.css'

export default function SampleTable() {
    const columns = useMemo(() => FEEDBACK_COLUMNS, [])
    const data = useMemo(() => FBTable, [] )
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });
  return (
    <table {...getTableProps()}>
          <thead>
            {
              headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map(
                      (column) => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
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
  )
}
