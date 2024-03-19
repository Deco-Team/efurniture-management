// import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridColDef } from '@mui/x-data-grid'
import ActionCell from '~/components/table/ActionCell'
import { ScreenPath } from '~/global/enum'
import { ColumnProps } from '~/global/interfaces/interface'

export const categoriesColumn = ({ navigate }: ColumnProps): GridColDef[] => [
  {
    field: 'id',
    headerName: 'STT',
    width: 100,
    filterable: false,
    sortable: false,
    valueGetter: (params) => {
      const page = params.api.state.pagination.paginationModel.page
      const pageSize = params.api.state.pagination.paginationModel.pageSize
      const rowIndex = params.api.getRowIndexRelativeToVisibleRows(params.row.id)
      return page * pageSize + rowIndex + 1
    }
  },
  {
    field: 'name',
    headerName: 'Tên phân loại',
    width: 425,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'description',
    headerName: 'Mô tả',
    width: 550,
    filterable: false
  },
  {
    field: 'actions',
    headerName: 'Thao tác',
    width: 200,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const handleUpdateButton = (categoryId: string) => {
        navigate(ScreenPath.UPDATE_CATEGORY.replace(':categoryId', categoryId))
      }
      const handleViewButton = (categoryId: string) => {
        navigate(ScreenPath.VIEW_CATEGORY.replace(':categoryId', categoryId))
      }
      return (
        <ActionCell
          id={params.row.id as number}
          buttons={[
            { icon: <EditIcon />, onClick: () => handleUpdateButton(params.row.id) },
            { icon: <VisibilityIcon />, onClick: () => handleViewButton(params.row.id) }
          ]}
        />
      )
    }
  }
]
