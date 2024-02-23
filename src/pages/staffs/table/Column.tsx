import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ActionCell from '~/components/table/ActionCell'
import { ScreenPath } from '~/global/enum'
import { ColumnProps } from '~/global/interfaces/interface'

export const staffsColumn = ({ navigate }: ColumnProps): GridColDef[] => [
  {
    field: 'id',
    headerName: 'STT',
    width: 50,
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
    field: 'staffCode',
    headerName: 'Mã nhân viên',
    width: 150,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'lastName',
    headerName: 'Họ',
    width: 130,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  {
    field: 'firstName',
    headerName: 'Tên',
    width: 130,
    filterable: false,
    sortingOrder: ['asc', 'desc']
  },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'phone', headerName: 'Số điện thoại', width: 150 },
  { field: 'status', headerName: 'Trạng thái', width: 120 },
  {
    field: 'role',
    headerName: 'Chức vụ',
    width: 180
  },
  {
    field: 'actions',
    headerName: 'Thao tác',
    width: 150,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params: GridRenderCellParams) => {
      const handleViewButton = (staffId: string) => {
        navigate(ScreenPath.VIEW_STAFF.replace(':staffId', staffId))
      }
      const handleEditButton = (staffId: string) => {
        navigate(ScreenPath.UPDATE_STAFF.replace(':staffId', staffId))
      }
      return (
        <ActionCell
          id={params.row.id as number}
          buttons={[
            { icon: <EditIcon />, onClick: () => handleEditButton(params.row.id) },
            { icon: <VisibilityIcon />, onClick: () => handleViewButton(params.row.id) }
          ]}
        />
      )
    }
  }
]
