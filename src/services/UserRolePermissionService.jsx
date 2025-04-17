import { endpoints } from "../api/endPoints";
import { apiClient } from "../apiClient";
import { ROLE_PERMISSION } from "../Helper/EStore";
import EStore from "../lib/EStore";



class UserRolePermissionService {

    static async getPermission (){
        const response = await apiClient.get(
            `${endpoints().userRolePermissionAPI}/list`
          );

          return response;
    }

    static async hasPermission(permission) {

        let permissionList = await EStore.getItem(ROLE_PERMISSION);;
    
        if (permissionList) {
            const permissionsArray = permissionList.split(',');
            const isExist = permissionsArray.includes(permission);
            return isExist;
        }
        return false;
    }
    
}

export default UserRolePermissionService;