import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchToolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import { ICitiesList, CitiesService } from "../../shared/services/api/cities/CitiesService";
import { useDebounce } from "../../shared/hooks";
import { 
  Box,
  Icon,
  IconButton,
  LinearProgress, 
  Pagination, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TableHead, 
  TableRow 
} from "@mui/material";
import { Environment } from "../../shared/environment";


export const CitiesList: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<ICitiesList[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pendingPageReset, setPendingPageReset] = useState(false);

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const debouncedSearch = useDebounce(search, 1000);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
  
      try {
        const result = await CitiesService.getAll(page, debouncedSearch || "", Environment.MAXIMUM_ROWS);
  
        setIsLoading(false);
  
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data);
          setTotalCount(result.totalCount);
  
          if (pendingPageReset) {
            setPendingPageReset(false);
            setSearchParams({ search: debouncedSearch, page: "1" }, { replace: true });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        alert("Error fetching Cities");
      } 
    };

    fetchCities();
  }, [debouncedSearch, page]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      CitiesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("City deleted successfully");
            setRows(rows.filter(row => row.id !== id));
          }
        });
    }
  };

  return (
    <BasePageLayout 
      title="List of Cities" 
      toolbar={
        <SearchToolbar 
          showTextField
          searchText={search}
          onChangeSearchText={(newSearchText) => {
            setPendingPageReset(true);
            setSearchParams({ search: newSearchText, page: page.toString() }, { replace: true });
          }}
          onClickNewButton={() => navigate("/cities/details/new")}
        />
      }>
      
      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={200}>
                Actions
              </TableCell>
              <TableCell>
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <Box display="flex" gap={2}>
                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton size="small" onClick={() => navigate(`/cities/details/${row.id}`)}>
                      <Icon>edit</Icon>
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.EMPTY_LIST_MESSAGE}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalCount > 0 && totalCount > Environment.MAXIMUM_ROWS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    count={Math.ceil(totalCount / Environment.MAXIMUM_ROWS)}
                    page={page}
                    onChange={(_, newPage) => 
                      setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </BasePageLayout>
  );
};
