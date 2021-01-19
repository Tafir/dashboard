import React from 'react';

// Will need to correct the lower_snake naming later

const dateFormatter = (cell: any, row: any) => {
    return (
        <span>
          {
              (new Date(cell)).toLocaleString()
          }
        </span>
      );
}


export const columns = [
    {
        dataField: 'id',
        text: 'Post ID',
        hidden: true
    },
    {
        dataField: "title",
        text: "Title"
    },
    {
        dataField: "category",
        text: "Category"
    },
    {
        dataField: "date_created",
        text: "Date Created",
        formatter: dateFormatter
    },
    {
        dataField: "date_updated",
        text: "Date Updated",
        formatter: dateFormatter
    },
    {
        dataField: "date_due",
        text: "Date Due",
        formatter: dateFormatter
    }
]