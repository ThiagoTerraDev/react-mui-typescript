import { useSearchParams } from "react-router-dom";
import { SearchToolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import { IMembersList, MembersService } from "../../shared/services/api/members/MembersService";
import { useDebounce } from "../../shared/hooks";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export const MembersList: React.FC = () => {
  const [rows, setRows] = useState<IMembersList[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);

      try {
        const result = await MembersService.getAll(1, debouncedSearch || "");

        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(result.data);
          setTotalCount(result.totalCount);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        alert("Error fetching members");
      }
    };

    fetchMembers();
  }, [debouncedSearch]);

  return (
    <BasePageLayout 
      title="List of Members" 
      toolbar={
        <SearchToolbar 
          showTextField
          searchText={search}
          onChangeSearchText={newSearchText => setSearchParams({ search: newSearchText }, { replace: true })}
        />
      }>
      
      <TableContainer component={Paper} variant="outlined" sx={{ margin: 1, width: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Actions
              </TableCell>
              <TableCell>
                Fullname
              </TableCell>
              <TableCell>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell>Actions</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BasePageLayout>
  );
};
