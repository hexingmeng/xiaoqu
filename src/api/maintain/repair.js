import request from "@/utils/request";
export function getList(params) {
  console.log(params);
  return request({
    url: "/userRepair/list",
    method: "get",
    params,
  });
}