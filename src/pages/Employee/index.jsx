import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Table,
  Column,
  Input, // eslint-disable-next-line no-unused-vars
  Select, // eslint-disable-next-line no-unused-vars
  Label, // eslint-disable-next-line no-unused-vars
  Button,
  Datepicker,
  // eslint-disable-next-line no-unused-vars
  Modal,
  // eslint-disable-next-line no-unused-vars
  ModalBody,
  // eslint-disable-next-line no-unused-vars
  ModalFooter,
  Dropdown,
  // eslint-disable-next-line no-unused-vars
  TabView,
  // eslint-disable-next-line no-unused-vars
  TabPanel,
  // eslint-disable-next-line no-unused-vars
  Toast,
  Toolbar,
  ToolbarButton,
  ColumnToggleButton,
  ContextMenu, // eslint-disable-next-line no-unused-vars
} from "../../components";

import moment from "moment";
import * as request from "./request";
import {
  // eslint-disable-next-line no-unused-vars
  removeAccents,
  // eslint-disable-next-line no-unused-vars
  Confirm,
  // eslint-disable-next-line no-unused-vars
  validateCardNumber,
  // eslint-disable-next-line no-unused-vars
  validateEmail,
  // eslint-disable-next-line no-unused-vars
  isISODate,
  saveFile,
} from "../../global/helpers/utilities";
// eslint-disable-next-line no-unused-vars
import Cropper from "react-cropper";
import { useTooltip } from "../../global/custom_hooks/tooltip";
import { useLoading } from "../../global/custom_hooks/loading";
import EmployeeAvatar from "./Avatar";
import DrilldownTable from "./DrilldownTable";
import { useCallback } from "react";
import { useGlobalContext } from "../../global/context/global";
import EmployeeModal from "./Modal";
import EmployeeFilter from "./Filter";
export default function Employee(props) {
  useTooltip();
  const { username } = useGlobalContext();
  const localStorageView = localStorage.getItem(
    `${props.controller}.${username}.view`
  );
  const localJSONView =
    localStorageView &&
    localStorageView !== "null" &&
    localStorageView !== "undefined"
      ? JSON.parse(localStorageView)
      : null;
  const loading = useLoading();
  const [isEditing, setIsEditing] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const [genderLookUp, setGenderLookUp] = useState([]);
  const [emptypeLookUp, setEmptypeLookUp] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localView, setLocalView] = useState(localJSONView);
  const [customView, setCustomView] = useState();
  const [isViewDetailsMode, setIsViewDetailsMode] = useState(false);
  const cm = useRef();
  const contextmenuItem = [
    {
      label: "Chỉnh sửa",
      icon: "far fa-file-edit",
      visible: true,
      command: () => {
        handleEditItem(selectedEmployee);
      },
    },
    {
      label: "Xem chi tiết",
      icon: "far fa-info-circle",
      visible: true,
      command: () => {
        handleViewItem(selectedEmployee);
      },
    },
    {
      label: "Xoá",
      icon: "far fa-trash",
      visible: true,
      command: () => {
        // setSelectedNode(-1);
      },
    },
  ];
  const handleViewItem = useCallback((item) => {
    setIsViewDetailsMode(true);
    setIsModalOpen(true);
    setSelectedEmployee(item);
  }, []);
  const handleEditItem = useCallback((item) => {
    setIsViewDetailsMode(false);
    setIsModalOpen(true);
    setSelectedEmployee(item);
  }, []);
  const mappingGenderLookup = useMemo(() => {
    return genderLookUp.map((x) => ({
      value: x.NUM_VAL01,
      label: x.STR_VAL01,
    }));
  }, [genderLookUp]);

  const mappingEmptypeLookUp = useMemo(() => {
    return emptypeLookUp.map((x) => ({
      value: x.STR_VAL01,
      label: x.STR_VAL02,
    }));
  }, [emptypeLookUp]);

  const fetchEmployees = useCallback((customFilter) => {
    request.getEmployees(customFilter).then(({ data }) => {
      setEmployees([...data]);
    });
  }, []);

  const fetchGenderLookUp = useCallback(() => {
    request.getGenderLookUp().then(({ data }) => {
      setGenderLookUp([...data]);
    });
  }, []);

  const fetchEmployeeTypeLookUp = useCallback(() => {
    request.getEmployeeTypeLookUp().then(({ data }) => {
      setEmptypeLookUp([...data]);
    });
  }, []);
  const exportPDF = useCallback(() => {
    Toast.warn("Chức năng đang được xây dựng!");
  }, []);

  const exportExcel = useCallback(() => {
    Toast.warn("Chức năng đang được xây dựng!");
  }, []);

  const downloadTemplate = useCallback(() => {
    Toast.warn("Chức năng đang được xây dựng!");
  }, []);

  const refreshAll = useCallback(async () => {
    loading.show();
    fetchEmployees();
    fetchGenderLookUp();
    fetchEmployeeTypeLookUp();
    setSelectedEmployees(null);
    setShowFilter(false);
    setTimeout(() => {
      loading.hide();
    }, 500);
  }, [fetchEmployeeTypeLookUp, fetchEmployees, fetchGenderLookUp, loading]);

  const textEditor = useCallback((options) => {
    return (
      <Input
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  }, []);

  const datepickerEditor = useCallback((options) => {
    const value = options.value ? new Date(options.value) : new Date();
    return (
      <Datepicker
        dateFormat="dd/mm/yy"
        value={value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  }, []);

  const SaveEmployeeSingleField = useCallback(
    (id, field, value) => {
      const updateJson = {
        P_TYPE: "EDIT",
        EMPID: id,
        P_CONTROLLER: props.controller,
      };
      updateJson[field] = value;
      request
        .saveEmployee(updateJson)
        .then(async (x) => {
          const newID = x.data[0].EMPID;
          const response = await request.getEmployee(newID);
          const newRow = response.data;
          const tempEmp = [...employees];
          const employeeIndex = tempEmp.findIndex((x) => x.EMPID === newID);
          tempEmp[employeeIndex] = newRow;
          setEmployees(tempEmp);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [employees, props.controller]
  );

  const onCellEditComplete = useCallback(
    (e) => {
      let { rowData, newValue, field, originalEvent: event } = e;
      if (rowData[field] !== newValue) {
        switch (field) {
          case "DOB":
            if (newValue && moment(newValue, moment.ISO_8601, true).isValid())
              SaveEmployeeSingleField(
                rowData.EMPID,
                field,
                moment(newValue).format()
              );
            else rowData[field] = null;
            event.preventDefault();
            break;
          default:
            if (`${newValue}`.trim().length > 0) {
              SaveEmployeeSingleField(rowData.EMPID, field, newValue);
            } else event.preventDefault();
            break;
        }
      }
    },
    [SaveEmployeeSingleField]
  );

  const imageBodyTemplate = useCallback((rowData) => {
    return (
      <EmployeeAvatar id={rowData.EMPID} className="w-6 rounded-full mx-auto" />
    );
  }, []);

  const empcdBodyTemplate = useCallback((rowData) => {
    return (
      <p className="cursor-pointer border-b-primary border-b text-primary">
        {rowData.EMPCD}
      </p>
    );
  }, []);

  const dobBodyTemplate = useCallback((rowData) => {
    if (rowData.DOB) return moment(rowData.DOB).format("DD/MM/YYYY");
    else return null;
  }, []);

  const genderBodyTemplate = useCallback((rowData) => {
    return rowData.GENDER_STR;
  }, []);

  const emptypeBodyTemplate = useCallback((rowData) => {
    return rowData.EMPTYPE_STR;
  }, []);

  const rowExpansionTemplate = useCallback(
    (data) => {
      return (
        <DrilldownTable id={data.EMPID} isEditing={isEditing}></DrilldownTable>
      );
    },
    [isEditing]
  );

  const genderEditor = useCallback(
    (options) => {
      const { rowData } = options;
      const currentData = employees.find(
        (x) => x.EMPID === rowData.EMPID
      ).GENDER;
      return (
        <Dropdown
          filter
          value={currentData}
          options={mappingGenderLookup}
          optionLabel="label"
          optionValue="value"
          className="flex-1  w-full"
          onChange={(event) => {
            SaveEmployeeSingleField(rowData.EMPID, "GENDER", event.value);
          }}
        />
      );
    },
    [SaveEmployeeSingleField, employees, mappingGenderLookup]
  );
  const employeeTypeEditor = useCallback(
    (options) => {
      const { rowData } = options;
      const currentData = employees.find(
        (x) => x.EMPID === rowData.EMPID
      ).EMPTYPE;
      return (
        <Dropdown
          filter
          value={currentData}
          options={mappingEmptypeLookUp}
          optionLabel="label"
          optionValue="value"
          className="flex-1 w-full"
          onChange={(event) => {
            SaveEmployeeSingleField(rowData.EMPID, "EMPTYPE", event.value);
          }}
        />
      );
    },
    [SaveEmployeeSingleField, employees, mappingEmptypeLookUp]
  );

  const isSingleRowSelected = useMemo(
    () => selectedEmployees && selectedEmployees.length === 1,
    [selectedEmployees]
  );

  const isMultipleRowsSelected = useMemo(
    () => selectedEmployees && selectedEmployees.length > 0,
    [selectedEmployees]
  );

  const employeeTableColumns = useMemo(
    () => [
      {
        selectionMode: "multiple",
        className: "min-max-w-8",
        frozen: true,
        resizeable: false,
      },
      {
        body: imageBodyTemplate,
        className: "min-max-w-16",
        sortable: false,
        resizeable: false,
      },
      {
        header: "Mã",
        field: "EMPCD",
        body: empcdBodyTemplate,
        className: "column-w-20",
        sortable: true,
        resizeable: true,
      },
      {
        header: "Họ tên",
        field: "EMPNAME",
        className: "column-w-44",
        editor: isEditing ? textEditor : null,
        sortable: true,
        resizeable: true,
      },
      {
        header: "Chức vụ",
        field: "EMPTYPE",
        body: emptypeBodyTemplate,
        className: "column-w-44",
        editor: isEditing ? employeeTypeEditor : null,
        sortable: true,
        resizeable: true,
      },
      {
        header: "Tên tắt",
        field: "SHORTNAME",
        className: "column-w-24",
        editor: isEditing ? textEditor : null,
        sortable: true,
        resizeable: true,
      },
      {
        header: "Giới tính",
        field: "GENDER",
        body: genderBodyTemplate,
        className: "column-w-28",
        editor: isEditing ? genderEditor : null,
        sortable: true,
        resizeable: true,
      },
      {
        header: "Ngày sinh",
        field: "DOB",
        body: dobBodyTemplate,
        className: "column-w-36",
        editor: isEditing ? datepickerEditor : null,
        sortable: true,
        onCellEditComplete: onCellEditComplete,
        resizeable: true,
      },
      {
        header: "CMND/CCCD",
        field: "CARDNUM",
        className: "column-w-36",
        editor: isEditing ? textEditor : null,
        sortable: true,
        onCellEditComplete: onCellEditComplete,
        resizeable: true,
      },
      {
        header: "Địa chỉ",
        field: "ADDRESS_FULL",
        className: "flex-auto",
        editor: isEditing ? textEditor : null,
        sortable: true,
        onCellEditComplete: onCellEditComplete,
        resizeable: true,
      },
      {
        header: "SĐT",
        field: "FONE",
        className: "column-w-40",
        editor: isEditing ? textEditor : null,
        sortable: true,
        onCellEditComplete: onCellEditComplete,
        resizeable: true,
      },
      {
        header: "Email",
        field: "EMAIL",
        className: "column-w-56",
        editor: isEditing ? textEditor : null,
        sortable: true,
        onCellEditComplete: onCellEditComplete,
        resizeable: true,
      },
    ],
    [
      datepickerEditor,
      dobBodyTemplate,
      empcdBodyTemplate,
      employeeTypeEditor,
      emptypeBodyTemplate,
      genderBodyTemplate,
      genderEditor,
      imageBodyTemplate,
      isEditing,
      onCellEditComplete,
      textEditor,
    ]
  );

  const allFields = useMemo(
    () =>
      employeeTableColumns
        .filter((col) => col.field)
        .map((col) => ({
          header: col.header,
          field: col.field,
        })),
    [employeeTableColumns]
  );

  const CustomColumns = useMemo(() => {
    const selected = customView?.VW_COLUMN;
    return employeeTableColumns.filter(
      (col) => !col.field || !selected || selected?.includes(col.field)
    );
  }, [customView, employeeTableColumns]);

  const handleSort = useCallback(
    (e) => {
      const tempCustomView = { ...customView };
      tempCustomView.VW_SORT_FIELD = e.sortField;
      tempCustomView.VW_SORT_ORDER = e.sortOrder;
      setCustomView(tempCustomView);
    },
    [customView]
  );

  const handleToggleColumn = useCallback(
    (columns) => {
      const tempCustomView = { ...customView };
      tempCustomView.VW_COLUMN = columns;
      setCustomView(tempCustomView);
    },
    [customView]
  );

  const handleSelectView = useCallback((view) => {
    setLocalView(view);
  }, []);
  const handleFilter = useCallback(
    (filterParams) => {
      loading.show();
      fetchEmployees(filterParams);
      setTimeout(() => {
        loading.hide();
      }, 400);
    },
    [fetchEmployees, loading]
  );

  const handleRefreshFilter = useCallback(() => {
    loading.show();
    fetchEmployees(null);
    setTimeout(() => {
      loading.hide();
    }, 400);
  }, [fetchEmployees, loading]);

  useEffect(() => {
    fetchEmployees();
    fetchGenderLookUp();
    fetchEmployeeTypeLookUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localView) {
      setCustomView(localView);
      localStorage.setItem(
        `${props.controller}.${username}.view`,
        JSON.stringify(localView, null, 4)
      );
    } else {
      const newLocalView = {
        PROFILEID: null,
        VW_COLUMN: allFields.map((x) => x.field),
        VW_SORT_FIELD: null,
        VW_SORT_ORDER: null,
        VW_NAME: "Mặc định",
      };
      localStorage.setItem(
        `${props.controller}.${username}.view`,
        JSON.stringify(newLocalView, null, 4)
      );
      setCustomView(newLocalView);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localView]);
  return (
    <>
      <EmployeeModal
        isOpen={isModalOpen}
        isView={isViewDetailsMode}
        onHide={() => {
          setIsModalOpen(false);
        }}
        employee={selectedEmployee}
      />
      <EmployeeFilter
        isVisible={showFilter}
        onHide={() => {
          setShowFilter(false);
        }}
        onFilter={handleFilter}
        onRefreshFilter={handleRefreshFilter}
      />
      <Row>
        <Col>
          <Toolbar
            leftButtons={
              <>
                <ToolbarButton
                  type={"add"}
                  onClick={() => {
                    handleEditItem({});
                  }}
                />
                <ToolbarButton
                  type={"grid-edit"}
                  active={isEditing}
                  onClick={() => {
                    setIsEditing((prev) => !prev);
                  }}
                />
                <ToolbarButton type={"refresh"} onClick={refreshAll} />
                <ToolbarButton
                  type={"filter"}
                  onClick={() => {
                    setShowFilter(true);
                  }}
                />
                {isSingleRowSelected && (
                  <ToolbarButton
                    type={"edit"}
                    onClick={() => {
                      handleEditItem(selectedEmployees[0]);
                    }}
                  />
                )}
                {isMultipleRowsSelected && <ToolbarButton type={"delete"} />}
              </>
            }
            rightButtons={
              <>
                {isSingleRowSelected && <ToolbarButton type={"duplicate"} />}
                <ToolbarButton type={"template"} onClick={downloadTemplate} />
                <ToolbarButton
                  type={"import-excel"}
                  onClick={downloadTemplate}
                />
                <ToolbarButton type={"export-excel"} onClick={exportExcel} />
                <ToolbarButton type={"export-pdf"} onClick={exportPDF} />
              </>
            }
          />
        </Col>
      </Row>
      <div className="mb-2 border-b border-slate-300"></div>
      <Row className="mb-2">
        <Col md="12">
          <Table
            dataKey="EMPID"
            value={employees}
            showGridlines={isEditing}
            removableSort
            sortField={customView?.VW_SORT_FIELD}
            sortOrder={customView?.VW_SORT_ORDER}
            onSort={handleSort}
            selectionMode="checkbox"
            selection={selectedEmployees}
            onSelectionChange={(e) => setSelectedEmployees(e.value)}
            editMode={isEditing ? "cell" : null}
            rowExpansionTemplate={rowExpansionTemplate}
            onContextMenuSelectionChange={(e) => setSelectedEmployee(e.value)}
            onContextMenu={(e) => cm.current.show(e.originalEvent)}
          >
            {CustomColumns.map((colprops, index) => (
              <Column key={index} {...colprops} />
            ))}
          </Table>
        </Col>
      </Row>
      <ContextMenu model={contextmenuItem} ref={cm}></ContextMenu>
    </>
  );
}
