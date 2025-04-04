import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import {
  Box,
  Button,
  MenuItem,
  Typography,
  lighten,
  IconButton,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import { openSuccessDialog } from "../../state/dialogSlice";
import { getAllCategories } from "../../state/categorySlice";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

const CategoryDataTable = () => {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((store) => store.categories);
  const data = useMemo(() => categories, [categories]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const { successDialog } = useSelector((store) => store.dialog);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, successDialog]);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.name,
        id: "name",
        header: "Category Name",
        size: 250,
        Cell: ({ renderedCellValue, row }) => {
          const [imageSrc, setImageSrc] = useState(null);
          useEffect(() => {
            if (
              row.original.imageUrl &&
              row.original.imageUrl.data &&
              row.original.imageUrl.data.data
            ) {
              const blob = new Blob(
                [Int8Array.from(row.original.imageUrl.data.data)],
                {
                  type: row.original.imageUrl.contentType,
                }
              );
              const image = window.URL.createObjectURL(blob);
              setImageSrc(image);

              // Cleanup the object URL when the component unmounts or when the avatar data changes
              return () => {
                window.URL.revokeObjectURL(image);
              };
            }
          }, []);
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <IconButton>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                    alt="category"
                  />
                )}
              </IconButton>
              {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
              <span>{renderedCellValue}</span>
            </Box>
          );
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 500,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: false,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30, 50, 100],
      shape: "rounded",
      variant: "outlined",
    },
    state: { isLoading },
    muiCircularProgressProps: {
      color: "primary",
      thickness: 5,
      size: 55,
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 28,
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
        }}
      >
        <EditRoundedIcon color="info" sx={{ mr: 1 }} />
        Edit
      </MenuItem>,
      <MenuItem
        key="delete"
        onClick={() => {
          closeMenu();
          setCurrentRow(row.original);
          setOpenDialog(true);
        }}
      >
        <DeleteForeverRoundedIcon color="error" sx={{ mr: 1 }} />
        Delete
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => (
      <Box
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.05),
          display: "flex",
          gap: "0.5rem",
          p: "8px",
          justifyContent: "space-between",
        })}
      >
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
        <Button
          sx={{
            padding: "8px 16px",
            backgroundColor: "#159eec",
            color: "#fff",
            "&:hover": { backgroundColor: "#127abb" },
          }}
          onClick={() => dispatch(openSuccessDialog())}
        >
          Add a Category
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const CategoryDataTableWithLocalizationProvider = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <CategoryDataTable />
  </LocalizationProvider>
);

export default CategoryDataTableWithLocalizationProvider;
