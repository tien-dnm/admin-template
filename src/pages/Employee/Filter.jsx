import React, { memo, useMemo, useCallback, useEffect, useState } from "react";
import {
  OffCanvas,
  Row,
  Col,
  Label,
  Input,
  Button,
  Select,
} from "../../components";
import * as request from "./request";
const EmployeeFilter = memo(
  ({
    isVisible = false,
    onHide = () => {},
    onFilter = () => {},
    onRefreshFilter = () => {},
  }) => {
    const [filter, setFilter] = useState();
    const [emptypeLookUp, setEmptypeLookUp] = useState([]);
    const changeFilter = useCallback(
      (field, value) => {
        const tempFilter = { ...filter };
        tempFilter[field] = value;
        setFilter(tempFilter);
      },
      [filter]
    );
    const fetchEmployeeTypeLookUp = useCallback(() => {
      request.getEmployeeTypeLookUp().then(({ data }) => {
        setEmptypeLookUp([...data]);
      });
    }, []);
    useEffect(() => {
      fetchEmployeeTypeLookUp();
    }, [fetchEmployeeTypeLookUp]);
    const mappingEmptypeLookUp = useMemo(() => {
      return emptypeLookUp.map((x) => ({
        value: x.STR_VAL01,
        label: x.STR_VAL02,
      }));
    }, [emptypeLookUp]);
    return (
      <>
        <OffCanvas visible={isVisible} position="right" onHide={onHide}>
          <Row className="mb-2">
            <Col>
              <Label>Mã:</Label>
              <Input
                placeholder="Mã"
                value={filter?.EMPCD || ""}
                onChange={(e) => {
                  changeFilter("EMPCD", e.target.value);
                }}
              />
            </Col>
            <Col>
              <Label>Họ tên:</Label>
              <Input
                placeholder="Họ tên"
                value={filter?.EMPNAME || ""}
                onChange={(e) => {
                  changeFilter("EMPNAME", e.target.value);
                }}
              />
            </Col>
            <Col>
              <Label>Chức vụ:</Label>
              <Select
                value={filter?.EMPTYPE || null}
                options={mappingEmptypeLookUp}
                placeholder="Chức vụ"
                isClearable
                onChange={(selected) => {
                  changeFilter("EMPTYPE", selected?.value);
                }}
              />
            </Col>
            <Col>
              <Button
                color="primary"
                onClick={() => {
                  onFilter(filter);
                }}
                className=" mt-7"
              >
                <i className="fal fa-filter text-sm"></i> Lọc
              </Button>
              <Button
                color="secondary"
                className=" mt-7"
                onClick={() => {
                  setFilter(null);
                  onRefreshFilter();
                }}
              >
                <i className="fal fa-redo-alt text-sm"></i>
              </Button>
            </Col>
          </Row>
        </OffCanvas>
      </>
    );
  }
);
export default EmployeeFilter;
