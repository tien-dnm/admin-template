import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { memo, useCallback, useMemo } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Buttons";
import { Input, Label } from "./Input";
import { Confirm } from "../global/helpers/utilities";
import { OffCanvas, Select, Toast } from ".";
import { useGlobalContext } from "../global/context/global";
export const Toolbar = ({ leftButtons = <></>, rightButtons = <></> }) => {
  return (
    <div className="flex flex-wrap justify-between rounded bg-gray-50">
      <div className="flex flex-wrap">{leftButtons}</div>
      <div className="flex flex-wrap">{rightButtons}</div>
    </div>
  );
};

const ToolbarBaseButton = ({
  icon = "",
  label = "",
  disabled = false,
  onClick,
  className,
  active = false,
  ...props
}) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`min-w-[70px] m-1 py-1 px-2 text-black disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-50 ${
          active
            ? "bg-gray-300 hover:bg-gray-400"
            : "bg-gray-50 hover:bg-gray-100"
        } ${className}`}
        {...props}
      >
        <div className="flex flex-col">
          <i className={`fa-regular ${icon} text-lg`}></i>
          <span className="text-xs font-semibold">{label}</span>
        </div>
      </button>
    </>
  );
};
const getUserProfile = (controller) => {
  return { data: [] };
};
const saveUserProfile = (saveData) => {
  return { data: [] };
};
const OffCanvasBody = memo(
  ({
    allColumns = [],
    viewColumns,
    viewName = "",
    viewID = 0,
    viewSortField,
    viewSortOrder,
    controller = "",
    onHidden = () => {},
    selectView = () => {},
  }) => {
    const [selectedCol, setSelectedCol] = useState(
      viewColumns || allColumns.map((x) => x.field)
    );
    const [sortField, setSortField] = useState(viewSortField);
    const [sortOrder, setSortOrder] = useState(viewSortOrder);
    const [name, setName] = useState(viewName);
    const { username } = useGlobalContext();
    const toggleColumn = useCallback(
      (field, isSelected) => {
        const temp = [...selectedCol];
        if (isSelected) {
          const indexOfField = temp.indexOf(field);
          if (indexOfField > -1) {
            temp.splice(indexOfField, 1);
          }
          setSelectedCol(temp);
        } else {
          setSelectedCol([field, ...temp]);
        }
      },
      [selectedCol]
    );
    const sortFieldOptions = useMemo(
      () =>
        allColumns.map((x) => ({
          value: x.field,
          label: x.header,
        })),
      [allColumns]
    );
    const sortOrderOptions = useMemo(
      () => [
        {
          value: "0",
          label: "Không",
        },
        {
          value: "-1",
          label: "Z-A",
        },

        {
          value: "1",
          label: "A-Z",
        },
      ],
      []
    );
    const onSave = useCallback(async () => {
      const saveData = {
        P_TYPE: viewID === 0 || !viewID ? "CREATE" : "EDIT",
        PROFILEID: viewID,
        PROFILETYPE: "CUSTOM_VIEW",
        VW_NAME: name,
        VW_COLUMN: JSON.stringify(selectedCol).replaceAll('"', '\\"'),
        VW_SORT_FIELD: sortField,
        VW_SORT_ORDER:
          sortOrder === "-1" ? "DESC" : sortOrder === "1" ? "ASC" : null,
        MNOBJECT: controller,
        P_CONTROLLER: controller,
        USER_NO: username,
      };
      if (selectedCol.length === 0) {
        Toast.warn("Vui lòng chọn ít nhất 1 cột để hiển thị");
        return;
      }
      if (!saveData.VW_NAME.trim()) {
        Toast.warn("Vui lòng nhập tên view");
        return;
      }
      const existView = await getUserProfile(controller);
      const viewData = existView.data.filter(
        (x) =>
          x.PROFILEID !== saveData.PROFILEID &&
          x.VW_NAME.trim().toLowerCase() ===
            saveData.VW_NAME.trim().toLowerCase()
      );
      if (viewData.length > 0) {
        Toast.warn("Tên view đã tồn tại, vui lòng chọn tên khác");
        return;
      }
      if (saveData.VW_NAME.trim().toLowerCase() === "mặc định") {
        Toast.warn("Tên view đã tồn tại, vui lòng chọn tên khác");
        return;
      }
      saveUserProfile(saveData)
        .then((x) => {
          Toast.success("Lưu view thành công");
          const data = x.data[0];
          selectView({
            PROFILEID: data.PROFILEID,
            VW_COLUMN: JSON.parse(data.VW_COLUMN),
            VW_NAME: data.VW_NAME,
            VW_SORT_FIELD: data.VW_SORT_FIELD,
            VW_SORT_ORDER:
              data.VW_SORT_ORDER === "ASC"
                ? 1
                : data.VW_SORT_ORDER === "DESC"
                ? -1
                : null,
          });
          onHidden();
        })
        .catch((x) => {
          Toast.error("Lưu view thất bại");
        });
    }, [
      controller,
      name,
      onHidden,
      selectView,
      selectedCol,
      sortField,
      sortOrder,
      username,
      viewID,
    ]);
    const ConfirmDelete = useCallback(() => {
      const saveData = {
        P_TYPE: "DELETE",
        PROFILEID: viewID,
        P_CONTROLLER: controller,
      };
      saveUserProfile(saveData)
        .then((x) => {
          Toast.success("Xoá view thành công");
          selectView({
            PROFILEID: null,
            VW_COLUMN: allColumns.map((x) => x.field),
            VW_NAME: "Mặc định",
            VW_SORT_FIELD: null,
            VW_SORT_ORDER: null,
          });
          onHidden();
        })
        .catch((x) => {
          Toast.error("Xoá view thất bại");
        });
    }, [allColumns, controller, onHidden, selectView, viewID]);
    const onDelete = useCallback(() => {
      Confirm({
        message: "Bạn có chắc muốn xoá view này hay không?",
        accept: ConfirmDelete,
      });
    }, [ConfirmDelete]);
    return useMemo(
      () => (
        <>
          <Label>Cột hiển thị</Label>
          <div
            className="grid grid-flow-col mb-2 grid-cols-2"
            style={{
              gridTemplateRows: `repeat(${Math.floor(
                allColumns.length / 2
              )},auto)`,
            }}
          >
            {allColumns.map((option, index) => {
              const isSelected =
                selectedCol.find((col) => col === option.field) !== undefined;
              return (
                <div
                  key={index}
                  className={`${
                    isSelected ? "active" : ""
                  }  hover:bg-blue-300 cursor-pointer checkbox-before-text`}
                  onClick={(e) => {
                    toggleColumn(option.field, isSelected);
                  }}
                >
                  {option.header}
                </div>
              );
            })}
          </div>
          <hr></hr>
          <div className="grid grid-rows-2 mb-2 pt-2">
            <Label>Tên view</Label>
            <div>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Tên view"
              ></Input>
            </div>
          </div>
          <div className="grid grid-rows-2 mb-2 pt-2">
            <Label>Sắp xếp</Label>
            <div className="grid grid-cols-5 gap-1">
              <div className="col-span-3">
                <Select
                  isClearable
                  isSearchable={false}
                  value={sortField}
                  placeholder="Cột"
                  options={sortFieldOptions}
                  onChange={(selected) => {
                    setSortField(selected?.value);
                  }}
                />
              </div>
              <div className="col-span-2">
                <Select
                  isSearchable={false}
                  value={sortOrder}
                  placeholder="Thứ tự"
                  options={sortOrderOptions}
                  onChange={(selected) => {
                    setSortOrder(selected?.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            {viewID && (
              <Button outline color="danger" onClick={onDelete}>
                <i className="far fa-trash"></i>
                Xoá
              </Button>
            )}
            <Button onClick={onSave}>
              <i className="far fa-save"></i>
              Lưu
            </Button>
          </div>
        </>
      ),
      [
        allColumns,
        name,
        onDelete,
        onSave,
        selectedCol,
        sortField,
        sortFieldOptions,
        sortOrder,
        sortOrderOptions,
        toggleColumn,
        viewID,
      ]
    );
  }
);
export const ColumnToggleButton = memo(
  ({
    disabled = false,
    onClick,
    allColumns = [],
    controller = "",
    onToggle = () => {},
    onSelectView = () => {},
    customView = {},
  }) => {
    const [userProfile, setUserProfile] = useState([]);
    const [body, setBody] = useState(<></>);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const toggleColumn = useCallback(
      (field, isSelected) => {
        const temp = [...customView?.VW_COLUMN];
        if (isSelected) {
          const indexOfField = temp.indexOf(field);
          if (indexOfField > -1) {
            temp.splice(indexOfField, 1);
          }
          onToggle(temp);
        } else {
          onToggle([field, ...temp]);
        }
      },
      [customView, onToggle]
    );
    const selectView = useCallback(
      (view) => {
        onSelectView(view);
      },
      [onSelectView]
    );
    const toggleOpen = useCallback(
      (open) => {
        if (open === false) {
          getUserProfile(controller).then(({ data }) => {
            setUserProfile(data);
          });
        }
      },
      [controller]
    );
    return useMemo(
      () => (
        <>
          <OffCanvas
            visible={showOffcanvas}
            position="right"
            onHide={() => {
              setShowOffcanvas(false);
            }}
          >
            {body}
          </OffCanvas>
          <Menu as="div" className={"relative min-w-[70px] m-1"}>
            {({ open }) => (
              <>
                <Menu.Button
                  disabled={disabled}
                  onClick={(e) => {
                    toggleOpen(open);
                    if (onClick) {
                      onClick();
                    }
                  }}
                  className={`py-1 px-2 text-black disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-50 bg-gray-50 hover:bg-gray-100`}
                >
                  <div className="flex flex-col">
                    <i className={`fa-regular fa-table-columns text-lg`}></i>
                    <span className="text-xs font-semibold">Ẩn/hiện cột</span>
                  </div>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute left-0 lg:left-auto lg:right-0 min-w-48 mt-2 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 z-10">
                    <Menu.Item disabled>
                      <Link
                        to={"#"}
                        className={`block whitespace-nowrap px-4 py-2 text-sm font-bold text-gray-700 bg-slate-100`}
                      >
                        Tuỳ chọn cột
                      </Link>
                    </Menu.Item>
                    <div className="custom-toggle-columns-container">
                      {allColumns.map((option, index) => {
                        const isSelected =
                          customView?.VW_COLUMN?.find(
                            (col) => col === option.field
                          ) !== undefined;
                        return (
                          <Menu.Item
                            key={index}
                            className={`${
                              isSelected ? "active" : ""
                            } custom-toggle-columns-button hover:bg-blue-300  checkbox-before-text`}
                          >
                            <Link
                              onClick={(e) => {
                                e.preventDefault();
                                toggleColumn(option.field, isSelected);
                              }}
                            >
                              {option.header}
                            </Link>
                          </Menu.Item>
                        );
                      })}
                    </div>
                    <Menu.Item disabled>
                      <Link
                        to={"#"}
                        className={`block whitespace-nowrap px-4 py-2 text-sm font-bold text-gray-700 bg-slate-100`}
                      >
                        View
                      </Link>
                    </Menu.Item>
                    <div>
                      <Menu.Item>
                        <Link
                          to={"#"}
                          onClick={(e) => {
                            e.preventDefault();
                            selectView({
                              PROFILEID: null,
                              VW_COLUMN: allColumns.map((x) => x.field),
                              VW_NAME: "Mặc định",
                              VW_SORT_FIELD: null,
                              VW_SORT_ORDER: null,
                            });
                          }}
                          className={`block whitespace-nowrap px-4 py-2 text-sm text-gray-700 font-semibold hover:bg-blue-300  ${
                            customView?.PROFILEID === null
                              ? "bg-primary-200"
                              : ""
                          }`}
                        >
                          Mặc định
                        </Link>
                      </Menu.Item>
                      {userProfile.map((item, index) => (
                        <Menu.Item key={index}>
                          <Link
                            to={"#"}
                            onClick={(e) => {
                              e.preventDefault();
                              selectView({
                                PROFILEID: item.PROFILEID,
                                VW_COLUMN: JSON.parse(item.VW_COLUMN),
                                VW_NAME: item.VW_NAME,
                                VW_SORT_FIELD: item.VW_SORT_FIELD,
                                VW_SORT_ORDER:
                                  item.VW_SORT_ORDER === "ASC"
                                    ? 1
                                    : item.VW_SORT_ORDER === "DESC"
                                    ? -1
                                    : null,
                              });
                            }}
                            className={`block whitespace-nowrap px-4 py-2 text-sm text-gray-700 underline hover:bg-blue-300  ${
                              customView?.PROFILEID === item.PROFILEID
                                ? "bg-primary-200"
                                : ""
                            }`}
                          >
                            {item.VW_NAME}
                          </Link>
                        </Menu.Item>
                      ))}
                    </div>
                    <div>
                      <Menu.Item>
                        <Link
                          to={"#"}
                          onClick={(e) => {
                            setBody(
                              <OffCanvasBody
                                allColumns={allColumns}
                                controller={controller}
                                viewColumns={customView?.VW_COLUMN}
                                viewID={null}
                                viewName={""}
                                viewSortField={customView?.VW_SORT_FIELD}
                                viewSortOrder={customView?.VW_SORT_ORDER}
                                onHidden={() => {
                                  setShowOffcanvas(false);
                                }}
                                selectView={selectView}
                              />
                            );
                            setShowOffcanvas(true);
                          }}
                          className={`block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 font-semibold`}
                        >
                          Tạo view mới
                        </Link>
                      </Menu.Item>
                      {customView?.PROFILEID !== null &&
                        customView?.PROFILEID !== 0 && (
                          <Menu.Item>
                            <Link
                              to={"#"}
                              onClick={(e) => {
                                setBody(
                                  <OffCanvasBody
                                    allColumns={allColumns}
                                    controller={controller}
                                    viewColumns={customView?.VW_COLUMN}
                                    viewID={customView?.PROFILEID}
                                    viewName={customView?.VW_NAME}
                                    viewSortField={customView?.VW_SORT_FIELD}
                                    viewSortOrder={customView?.VW_SORT_ORDER}
                                    onHidden={() => {
                                      setShowOffcanvas(false);
                                    }}
                                    selectView={selectView}
                                  />
                                );
                                setShowOffcanvas(true);
                              }}
                              className={`block whitespace-nowrap px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 font-semibold`}
                            >
                              Chỉnh sửa view hiện tại
                            </Link>
                          </Menu.Item>
                        )}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </>
      ),
      [
        allColumns,
        body,
        controller,
        customView,
        disabled,
        onClick,
        selectView,
        showOffcanvas,
        toggleColumn,
        toggleOpen,
        userProfile,
      ]
    );
  }
);
/**
 * 
 *	
																
 */

export const ToolbarButton = ({
  type,
  disabled = false,
  onClick,
  active = false,
}) => {
  const options = buttons.find((btn) => type === btn.type);
  if (options) {
    const label = options.cantoggle
      ? active
        ? options.activelabel
        : options.label
      : options.label;
    return (
      <ToolbarBaseButton
        icon={options.icon}
        label={label}
        disabled={disabled}
        onClick={onClick}
        active={active}
      />
    );
  } else {
    return <></>;
  }
};

const buttons = [
  {
    type: "add",
    icon: "fa-plus",
    label: "Thêm mới",
    cantoggle: false,
  },
  {
    type: "grid-edit",
    icon: "fa-table-cells",
    label: "Chỉnh sửa nhanh",
    activelabel: "Thoát chỉnh sửa",
    cantoggle: true,
  },
  {
    type: "refresh",
    icon: "fa-rotate-right",
    label: "Làm mới",
    cantoggle: false,
  },
  {
    type: "filter",
    icon: "fa-filters",
    label: "Bộ lọc",
    cantoggle: false,
  },
  {
    type: "edit",
    icon: "fa-file-edit",
    label: "Chỉnh sửa",
    cantoggle: false,
  },
  {
    type: "delete",
    icon: "fa-trash-can",
    label: "Xoá",
    cantoggle: false,
  },
  {
    type: "duplicate",
    icon: "fa-clone",
    label: "Tạo bản sao",
    cantoggle: false,
  },
  {
    type: "print",
    icon: "fa-print",
    label: "In",
    cantoggle: false,
  },
  {
    type: "template",
    icon: "fa-file-arrow-down",
    label: "Template",
    cantoggle: false,
  },
  {
    type: "import-excel",
    icon: "fa-file-import",
    label: "Import Excel",
    cantoggle: false,
  },
  {
    type: "export-excel",
    icon: "fa-file-excel",
    label: "Export Excel",
    cantoggle: false,
  },
  {
    type: "export-pdf",
    icon: "fa-file-pdf",
    label: "Export PDF",
    cantoggle: false,
  },
];
