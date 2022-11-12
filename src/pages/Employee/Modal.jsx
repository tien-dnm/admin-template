import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  TabView,
  TabPanel,
  Col,
  Button,
  Label,
  Input,
  Dropdown,
  Select,
  Datepicker,
} from "../../components";
import EmployeeAvatar from "./Avatar";
import * as request from "./request";
import moment from "moment";
import { useTooltip } from "../../global/custom_hooks/tooltip";
const EmployeeModal = ({
  isOpen = false,
  onHide = () => {},
  employee = {},
  isView = false,
}) => {
  useTooltip();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [genderLookUp, setGenderLookUp] = useState([]);
  const [emptypeLookUp, setEmptypeLookUp] = useState([]);
  const fetchEmployeeTypeLookUp = useCallback(() => {
    request.getEmployeeTypeLookUp().then(({ data }) => {
      setEmptypeLookUp([...data]);
    });
  }, []);
  useEffect(() => {
    setSelectedEmployee(employee);
  }, [employee]);

  const fetchGenderLookUp = useCallback(() => {
    request.getGenderLookUp().then(({ data }) => {
      setGenderLookUp([...data]);
    });
  }, []);
  const mappingGenderLookup = useMemo(() => {
    return genderLookUp.map((x) => ({
      value: `${x.NUM_VAL01}`,
      label: x.STR_VAL01,
    }));
  }, [genderLookUp]);
  const mappingEmptypeLookUp = useMemo(() => {
    return emptypeLookUp.map((x) => ({
      value: x.STR_VAL01,
      label: x.STR_VAL02,
    }));
  }, [emptypeLookUp]);

  const changeSelectedEmployee = useCallback(
    (key, value) => {
      const temp = { ...selectedEmployee };
      temp[key] = value;
      setSelectedEmployee(temp);
    },
    [selectedEmployee]
  );

  useEffect(() => {
    fetchGenderLookUp();
    fetchEmployeeTypeLookUp();
  }, []);
  useEffect(() => {}, [selectedEmployee]);
  return (
    <>
      <Modal
        open={isOpen}
        onHide={() => {
          onHide();
        }}
        header={"Thêm mới danh mục"}
      >
        <ModalBody>
          {!isView && (
            <Row>
              <TabView
                activeIndex={activeTabIndex}
                onTabChange={(e) => setActiveTabIndex(e.index)}
              >
                <TabPanel header="Thông tin">
                  <Row>
                    <Col xl={1} />
                    <Col xl={10}>
                      <Row>
                        <Col lg={2}>
                          <Row>
                            <Col className="flex justify-center">
                              <EmployeeAvatar
                                className="w-full max-w-[200px]"
                                id={selectedEmployee?.EMPID}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="flex justify-center">
                              <Button
                                outline
                                color="secondary"
                                data-tip="Tải lên ảnh mới"
                                data-place="bottom"
                                className="rounded-full h-9 w-9"
                              >
                                <i className="far fa-camera text-sm"></i>
                              </Button>
                              <Button
                                outline
                                color="secondary"
                                data-tip="Chọn ảnh từ thư viện"
                                data-place="bottom"
                                className="rounded-full h-9 w-9"
                              >
                                <i className="far fa-rectangle-history-circle-user text-sm"></i>
                              </Button>
                              <Button
                                outline
                                color="secondary"
                                data-tip="Xoá ảnh hiện tại"
                                data-place="bottom"
                                className="rounded-full h-9 w-9"
                              >
                                <i className="far fa-times text-sm"></i>
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={10}>
                          <Row>
                            <Col className="mb-2" md="4" lg="4" xl="4" xxl="4">
                              <Label>Mã:</Label>
                              <Input
                                disabled
                                placeholder="Mã"
                                value={selectedEmployee?.EMPCD}
                                onChange={(e) => {
                                  changeSelectedEmployee(
                                    "EMPCD",
                                    e.target.value
                                  );
                                }}
                              />
                            </Col>
                            <Col className="mb-2" md="4" lg="4" xl="4" xxl="4">
                              <Label>Họ tên:</Label>
                              <Input
                                placeholder="Họ tên"
                                value={selectedEmployee?.EMPNAME}
                                onChange={(e) => {
                                  changeSelectedEmployee(
                                    "EMPNAME",
                                    e.target.value
                                  );
                                }}
                              />
                            </Col>
                            <Col className="mb-2" md="4" lg="4" xl="4" xxl="4">
                              <Label>Tên tắt:</Label>
                              <Input
                                placeholder="Tên tắt"
                                value={selectedEmployee?.SHORTNAME}
                                onChange={(e) => {
                                  changeSelectedEmployee(
                                    "SHORTNAME",
                                    e.target.value
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="mb-2" md="4" lg="4" xl="4" xxl="4">
                              <Label>Chức vụ:</Label>
                              <Select
                                value={selectedEmployee?.EMPTYPE}
                                options={mappingEmptypeLookUp}
                                placeholder="Chức vụ"
                                isClearable
                                onChange={(selected) => {
                                  changeSelectedEmployee(
                                    "EMPTYPE",
                                    `${selected?.value || ""}`
                                  );
                                }}
                              />
                            </Col>

                            <Col className="mb-2" md="4" lg="4" xl="4" xxl="4">
                              <Label>Giới tính:</Label>
                              <Select
                                value={`${selectedEmployee?.GENDER}`}
                                options={mappingGenderLookup}
                                placeholder="Giới tính"
                                isClearable
                                isSearchable={false}
                                onChange={(selected) => {
                                  changeSelectedEmployee(
                                    "GENDER",
                                    `${selected?.value || ""}`
                                  );
                                }}
                              />
                            </Col>
                            <Col className="mb-2" md="4" lg="4" xl="4" xxl="4">
                              <Label>Ngày sinh:</Label>
                              <Datepicker
                                dateFormat="dd/mm/yy"
                                value={
                                  (selectedEmployee?.DOB &&
                                    new Date(selectedEmployee?.DOB)) ||
                                  null
                                }
                                onChange={(e) => {
                                  changeSelectedEmployee(
                                    "DOB",
                                    moment(e.target.value).format()
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="mb-2" md="4" lg="4" xl="4" xxl="4">
                              <Label>CMND/CCCD:</Label>
                              <Input
                                placeholder="CMND/CCCD"
                                value={selectedEmployee?.CARDNUM}
                                onChange={(e) => {
                                  changeSelectedEmployee(
                                    "CARDNUM",
                                    e.target.value
                                  );
                                }}
                              />
                            </Col>
                            <Col className="mb-2" md="8" lg="8" xl="8" xxl="8">
                              <Label>Địa chỉ:</Label>
                              <Input
                                placeholder="Địa chỉ"
                                value={selectedEmployee?.ADDRESS_FULL}
                                onChange={(e) => {
                                  changeSelectedEmployee(
                                    "ADDRESS_FULL",
                                    e.target.value
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col className="mb-2" md="4" lg="4" xl="4" xxl="4">
                              <Label>Email:</Label>
                              <Input
                                placeholder="Email"
                                value={selectedEmployee?.EMAIL}
                                onChange={(e) => {
                                  changeSelectedEmployee(
                                    "EMAIL",
                                    e.target.value
                                  );
                                }}
                              />
                            </Col>
                            <Col className="mb-2" md="8" lg="8" xl="8" xxl="8">
                              <Label>Ghi chú:</Label>
                              <Input
                                placeholder="Ghi chú"
                                value={selectedEmployee?.DESCT}
                                onChange={(e) => {
                                  changeSelectedEmployee(
                                    "DESCT",
                                    e.target.value
                                  );
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={1} />
                  </Row>
                </TabPanel>
                <TabPanel header="Thuộc tính">Content II</TabPanel>
              </TabView>
            </Row>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              onHide();
            }}
          >
            Lưu
          </Button>
          <Button
            color="danger"
            onClick={() => {
              onHide();
            }}
          >
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default memo(EmployeeModal);
