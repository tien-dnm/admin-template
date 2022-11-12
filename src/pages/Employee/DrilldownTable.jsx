import React, { useState, useEffect, memo } from "react";
import * as request from "./request";
import { Table, Column, Input } from "../../components";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { InputSwitch } from "primereact/inputswitch";
const DrilldownTable = memo(({ id, isEditing }) => {
  const [defaultCate, setDefaultCate] = useState([]);
  const [empCate, setEmpCate] = useState([]);
  useEffect(() => {
    request.getEmployeeCategories(id).then(({ data }) => {
      setEmpCate(data);
    });
    request.getDefaultEmployeeCategories().then(({ data }) => {
      setDefaultCate(data);
    });
  }, [id]);
  const textEditor = (options) => {
    return (
      <Input
        type="text"
        value={options.value}
        onChange={(e) => {}}
        //	onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  return (
    <>
      <div className="flex gap-2 pl-10">
        {defaultCate.map((cat, index) => {
          const thisEmpCate = empCate.filter((x) => x.CATEID === cat.CATEID);
          const isBetween = cat.CATETYPE.endsWith("_BETWEEN");
          const headerTemplate = (
            <ColumnGroup>
              <Row>
                <Column header={cat.CATENM} colSpan={2} />
              </Row>
            </ColumnGroup>
          );
          const renderValueS = (rowData) => {
            if (cat.CATETYPE === "CHECKBOX") {
              return (
                <InputSwitch
                  trueValue={cat.CATEVALUEON}
                  falseValue={cat.CATEVALUEOFF}
                  checked={rowData.VALUESTRING_S}
                  onChange={(e) => {}}
                />
              );
            }
            return rowData.VALUESTRING_S;
          };
          return (
            <Table
              key={index}
              value={thisEmpCate}
              paginator={false}
              headerColumnGroup={headerTemplate}
              editMode={isEditing ? "cell" : null}
            >
              <Column
                bodyClassName={
                  cat.CATETYPE === "CHECKBOX" ? "justify-center" : ""
                }
                field="VALUESTRING_S"
                editor={
                  cat.CATETYPE === "CHECKBOX" || !isEditing ? null : textEditor
                }
                body={renderValueS}
              />
              {isBetween && (
                <Column
                  field="VALUESTRING_E"
                  editor={
                    cat.CATETYPE === "CHECKBOX" || !isEditing
                      ? null
                      : textEditor
                  }
                />
              )}
            </Table>
          );
        })}
      </div>
    </>
  );
});
export default DrilldownTable;
