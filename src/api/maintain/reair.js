import request from "@/utils/request";
export function getList(params) {
  return request({
    url: "/userRepair/myList",
    method: "get",
    params,
  });
}
export function getNewAdd(data) {
    return request({
      url: "/userRepair",
      method: "post",
      data,
    });
  }
  export function getEdit(data) {
    return request({
      url: "/userRepair",
      method: "put",
      data,
    });
  }
  export function getDelte(id) {
    return request({
      url: `/userRepair/${id}`,
      method: "DELETE",
    });
  }