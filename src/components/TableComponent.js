import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { cityAPICall, searchAPICall } from "../shared/APICalls";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { DebounceInput } from "react-debounce-input";

const TableComponent = () => {
  const cache = setupCache({
    maxAge: 15 * 60 * 1000,
  });
  const api = axios.create({
    adapter: cache.adapter,
  });
  const history = useHistory();
  const handleTableClick = (row) => {
    history.push(`/bank/${row.bank_id}`);
  };
  const arrayConstructor = [].constructor;
  const proxyurl = "";
  const [currentCity, setCity] = useState("Mumbai");
  const [searchQuery, setSearchQuery] = useState(null);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [tableData, setTableData] = useState(null);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [lastTableData, setLastTableData] = useState();

  useEffect(() => {
    if (checkboxValue) {
      setLastTableData(tableData);
      setTableData(JSON.parse(localStorage.getItem("favourites")));
    } else setTableData(lastTableData);
  }, [checkboxValue]);
  useEffect(() => {
    api({
      url:
        proxyurl +
        cityAPICall +
        currentCity +
        "&limit=" +
        limit +
        "&offset=" +
        offset,
      method: "get",
    })
      .then((result) => {
        setTableData(result.data);
      })
      .catch((error) => console.log(error));
  }, [currentCity]);
  useEffect(async () => {
    if (searchQuery && searchQuery !== "") {
      api({
        url:
          proxyurl +
          searchAPICall +
          searchQuery +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    } else {
      api({
        url:
          proxyurl +
          cityAPICall +
          currentCity +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [limit]);
  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      api({
        url:
          proxyurl +
          searchAPICall +
          searchQuery +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    } else {
      api({
        url:
          proxyurl +
          cityAPICall +
          currentCity +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [offset]);
  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      api({
        url:
          proxyurl +
          searchAPICall +
          searchQuery +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    } else {
      api({
        url:
          proxyurl +
          cityAPICall +
          currentCity +
          "&limit=" +
          limit +
          "&offset=" +
          offset,
        method: "get",
      })
        .then((result) => {
          setTableData(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [searchQuery]);
  return (
    <div className='table-component container-fluid'>
      <p className='table-title'>Bank Branches</p>
      <div className='row'>
        <div className='col-12'>
          <Form>
            <FormGroup style={{ display: "flex" }}>
              <Label for='citySelection'>City:</Label>
              <Input
                className='city-selection'
                type='select'
                name='citySelection'
                id='citySelection'
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              >
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Kolkata</option>
              </Input>
              <Label className='ml-auto' for='searchForBranch'>
                Search:
              </Label>
              <DebounceInput
                minLength={3}
                debounceTimeout={100}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </FormGroup>
          </Form>
        </div>
      </div>

      <div className='row'>
        <div className='col-12'>
          {tableData ? (
            <Table className='branch-table'>
              <thead>
                <tr>
                  <th>IFSC</th>
                  <th>BANKID</th>
                  <th>BRANCH</th>
                  <th>ADDRESS</th>
                  <th>CITY</th>
                  <th>DISTRICT</th>
                  <th>STATE</th>
                  <th>FAVOURITE</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => {
                  return (
                    <tr
                      className='pointer'
                      onClick={() => {
                        handleTableClick(data);
                      }}
                      key={index}
                    >
                      <td>{data.ifsc}</td>
                      <td>{data.bank_id}</td>
                      <td>{data.branch}</td>
                      <td>{data.address}</td>
                      <td>{data.city}</td>
                      <td>{data.district}</td>
                      <td>{data.state}</td>
                      <td>
                        <Button
                          onClick={() => {
                            var fav = JSON.parse(
                              localStorage.getItem("favourites")
                            );
                            console.log(fav);
                            if (fav) {
                              if (fav.constructor === arrayConstructor) {
                                if (fav.some((item) => item.ifsc === data.ifsc))
                                  alert("Already a favourite");
                                else fav.push(data);
                              } else {
                                console.log(fav);
                                console.log(data);
                                if (fav.ifsc === data.ifsc)
                                  alert("Already a favourite");
                                else {
                                  var favList = [];
                                  favList.push(fav);
                                  favList.push(data);
                                  fav = favList;
                                }
                              }
                              localStorage.setItem(
                                "favourites",
                                JSON.stringify(fav)
                              );
                            } else {
                              localStorage.setItem(
                                "favourites",
                                JSON.stringify(data)
                              );
                            }
                          }}
                        >
                          Add to Favourite
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className='d-flex justify-content-center align-items-center loader'>
              <div className='spinner-grow' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <Pagination size='lg' aria-label='Bank-Branch-Pagination'>
            <PaginationItem>
              <PaginationLink onClick={() => setOffset(0)} first />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (offset > 0) setOffset(offset - limit);
                }}
                previous
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setOffset(0)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setOffset(limit)}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setOffset(limit * 2)}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => {
                  if (tableData) setOffset(offset + limit);
                }}
                next
              />
            </PaginationItem>
          </Pagination>
          <Form>
            <FormGroup style={{ display: "flex", alignItems: "center" }}>
              <Label for='limitChange'>Rows / Page: </Label>
              <Input
                style={{ width: "10%" }}
                type='select'
                name='limitChange'
                id='limitChange'
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>25</option>
                <option>50</option>
              </Input>
              <Label
                style={{
                  marginLeft: "auto",
                  justifyContent: "center",
                  marginRight: "200px",
                }}
                check
              >
                <Input
                  style={{ height: "40px", width: "50px", marginLeft: "15rem" }}
                  onChange={() => setCheckboxValue(!checkboxValue)}
                  type='checkbox'
                />{" "}
                Check favourites
              </Label>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};
function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}
export default TableComponent;
