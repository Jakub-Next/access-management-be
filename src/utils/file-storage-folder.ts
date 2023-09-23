import {safeJoinPath} from './safe-join-path';
import {FileStorageFolder} from "../shared/types/common/utlis/file-storage-folder";

export const fileStorageFolder = (folder: FileStorageFolder) => {
  return safeJoinPath('public/uploads', folder);
};
