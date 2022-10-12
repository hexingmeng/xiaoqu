import request from "@/utils/request";
export function getList(params) {
  console.log(params);
  return request({
    url: "/sysNotice/list",
    method: "get",
    params,
  });
}
export function getNewAdd(data) {
  return request({
    url: "/sysNotice",
    method: "post",
    data,
  });
}
export function getEdit(data) {
  return request({
    url: "/sysNotice",
    method: "put",
    data,
  });
}
export function getDelte(id) {
  return request({
    url: `/sysNotice/${id}`,
    method: "DELETE",
  });
}
