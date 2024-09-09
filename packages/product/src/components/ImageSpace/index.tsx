import { CSSProperties, forwardRef, Key, ReactNode, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Button, message, Modal, ModalProps, Popover, PopoverProps, Spin, Typography, UploadFile } from 'antd';
import { classNames, useMergedState } from '@web-react/biz-utils';
import PicUploader, { DisplayPanelType, FolderType, PicUploaderProps, UploadResponseBody } from './Uploader';
import FolderTree, { FolderTreeType } from './FolderTree';
import PicPanel, { ImageFile } from './PicPanel';
import { useStyle } from './style';
import React from 'react';

type BaseRequestParam = {
  page: number,
  size: number,
  folderId?: Key
}

type ImageSpaceProps<
  RequestParamType extends BaseRequestParam = BaseRequestParam,
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
> = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: CSSProperties;
  /** 自定义样式前缀 */
  prefixCls?: string;

  mutiple?: boolean,
  pageSize?: number;
  defaultFolder?: FolderTreeType;
  fetchFolders?: () => Promise<FolderTreeType[]>;
  fetchData?: (param: RequestParamType) => Promise<{ items: ImageFile[], total: number, }>;
  defaultValue?: Key[];
  value?: Key[];
  onChange?: (ids: Key[], files: ImageFile[]) => void | Promise<void>;
  actions?: { left?: ReactNode },
  footer?: {
    left?: ReactNode | ((count: number) => ReactNode),
    right?: ReactNode | ((count: number) => ReactNode),
  },
  upload?: PicUploaderProps<UploadResponseBodyType>['upload'],
  defaultDisplay?: DisplayPanelType;
  display?: DisplayPanelType;
  onDisplayChange?: (display: DisplayPanelType) => void;
};

interface ImageSpaceRef {
  refresh: () => void | Promise<void>;
  clearSelected: () => void,
  setDisplay: (display: DisplayPanelType) => void
}

const InternalImageSpace = forwardRef<ImageSpaceRef, ImageSpaceProps<BaseRequestParam, UploadResponseBody>>(<
  UploadResponseBodyType extends UploadResponseBody = UploadResponseBody,
  RequestParamType extends BaseRequestParam = BaseRequestParam
>(
  props: ImageSpaceProps<RequestParamType, UploadResponseBodyType>,
  ref: Ref<ImageSpaceRef>
) => {
  const { style, className, defaultFolder, pageSize = 20, mutiple,
    fetchData, fetchFolders, onChange,
    actions, footer, upload
  } = props;
  const { prefixCls, wrapSSR, hashId, token } = useStyle(props.prefixCls);
  const classString = classNames(prefixCls, className, hashId, {});
  const [displayPanel, setDisplayPanel] = useMergedState<DisplayPanelType>('none', {
    defaultValue: props.defaultDisplay,
    value: props.display,
    onChange: props.onDisplayChange
  });

  const [selectKeys, setSelectKeys] = useMergedState<Key[]>([], {
    defaultValue: props?.defaultValue,
    value: props?.value,
    onChange: (value) => {
      const selectFiles = imageFiles.filter((item) => value.includes(item.id));
      onChange?.(value, selectFiles);
    },
  });

  const [loading, setLoading] = useState(false);
  const [dirloading, setDirLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [folderId, setFolderId] = useState<Key>(defaultFolder?.value || '');
  const [folders, setFolders] = useState<FolderTreeType[]>(defaultFolder ? [defaultFolder] : []);

  useEffect(() => {
    loadDirs();
    loadData({ page: curPage + 1, fist: true });
  }, []);

  useEffect(() => {
    if (folderId) { loadData({ page: 1 }); }
  }, [folderId]);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      return loadData({ page: 1 });
    },
    clearSelected: () => {
      setSelectKeys([]);
    },
    setDisplay: (display: DisplayPanelType) => {
      setDisplayPanel(display);
    }
  }))

  const loadDirs = async () => {
    setDirLoading(true);
    try {
      const data = await fetchFolders?.() || [];
      const folders = defaultFolder && !data.some(s => s.value === defaultFolder.value)
        ? [defaultFolder, ...data]
        : data;
      setFolders(folders);
    } catch (error: any) {
      message.error(error?.message || '加载失败');
    } finally {
      setDirLoading(false);
    }
  };

  const loadData = async (param: { page: number, fist?: boolean, [key: string]: any }) => {
    const { page, fist, ...rest } = param;
    const totalPage = fist ? 1 : Math.ceil(totalCount / pageSize);
    if (page > totalPage) { return; }
    setLoading(true);
    try {
      const param: RequestParamType = { ...rest, page, size: pageSize, folderId } as any;
      const data = await fetchData?.(param) || { items: [], total: 0 };
      const newData = data?.items || [];
      const newImageFiles = page > 1
        ? [...imageFiles, ...newData]
        : newData;
      setCurPage(page);
      setTotalCount(data.total || 0);
      setImageFiles(newImageFiles);
    } catch (error: any) {
      message.error(error?.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const selectCount = useMemo(() => {
    return selectKeys?.length || 0;
  }, [selectKeys]);

  return wrapSSR(
    <div className={classString} style={style}>
      <div style={{ display: displayPanel === 'uploader' ? 'none' : '' }}
        className={classNames(`${prefixCls}-body`, hashId)}>
        <div className={classNames(`${prefixCls}-content`, hashId)}>
          <div className={classNames(`${prefixCls}-aside`, hashId)}>
            <div className={classNames(`${prefixCls}-treeDom`, hashId)} >
              {dirloading &&
                <div className={classNames(`${prefixCls}-mask`, hashId)}>
                  <Spin spinning={true} />
                </div>
              }
              <FolderTree
                data={folders}
                value={folderId}
                onChange={(val) => {
                  setFolderId(val);
                }} />
            </div>
          </div>
          <PicPanel
            mutiple={mutiple}
            selectKeys={selectKeys}
            onSelect={(keys) => {
              setSelectKeys(keys);
            }}
            actions={{
              left: actions?.left,
              right: <Button
                // type="primary"
                onClick={() => {
                  setDisplayPanel('uploader')
                }}
              >
                上传图片
              </Button>,
            }}
            data={imageFiles}
            loading={loading}
            hasMore={curPage * pageSize >= totalCount}
            onLoadMore={() => loadData({ page: curPage + 1 })}
            onRefresh={() => loadData({ page: 1 })}
          />
        </div>
        {(footer?.left || footer?.right) &&
          <div className={classNames(`${prefixCls}-footer`, hashId)}>
            <div className={classNames(`${prefixCls}-footer-left`, hashId)}>
              {typeof footer?.left == 'function' ? footer?.left(selectCount) : footer?.left}
            </div>
            <div className={classNames(`${prefixCls}-footer-right`, hashId)}>
              {typeof footer?.right == 'function' ? footer?.right(selectCount) : footer?.right}
            </div>
          </div>
        }
      </div>
      <PicUploader<UploadResponseBodyType>
        display={displayPanel}
        onDisplayChange={(val) => {
          setDisplayPanel(val)
        }}
        defaultFolderValue={folderId as any}
        folders={folders as FolderType[]}
        fileList={fileList}
        onChange={(values) => {
          if (values?.length > 0 &&
            values.every((m) => m.status === 'done')
          ) {
            loadData({ page: 1 });
            setDisplayPanel('none');
            setFileList([]);
          } else {
            setFileList(values);
          }
        }}
        upload={upload}
        config={{
          right: <Button style={{ marginLeft: 'auto' }}
            onClick={() => { setDisplayPanel('none') }}
          >
            取消上传
          </Button>
        }}
      />
    </div>
  );
}
);

type ImageSpacePopoverProps = Omit<PopoverProps, 'children'> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const ImageSpacePopover = (props: ImageSpacePopoverProps) => {
  const {
    defaultOpen = false, open: isOpen, onOpenChange,
    content, children, style, ...rest
  } = props;

  const [open, setOpen] = useMergedState<boolean>(false, {
    defaultValue: defaultOpen,
    value: isOpen,
    onChange: onOpenChange
  });

  const getNewImageSpace = useCallback((children: ReactNode | (() => ReactNode)) => {
    children = typeof children == 'function' ? children() : content;
    const imageSpace = Array.isArray(children) ? children[0] : children;
    const { display, value, ...restProps } = imageSpace.props as ImageSpaceProps;
    return {
      ...imageSpace,
      props: {
        display: open ? display : 'none',
        value: open ? value : [],
        ...restProps,
      },
    };
  }, [open]);

  return (
    <Popover
      trigger={'click'}
      arrow={false}
      {...rest}
      content={getNewImageSpace(content)}
      open={open}
      onOpenChange={(open, e) => {
        setOpen?.(open);
      }}>
      {children}
    </Popover>
  )
};

type ImageSpaceModalProps = Omit<ModalProps, 'children' | 'footer' | 'open'> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}
const ImageSpaceModal = (props: ImageSpaceModalProps) => {
  const {
    defaultOpen = false, open: isOpen, onOpenChange, children,
    onCancel, styles, title, ...restModalProps
  } = props || {};

  const [open, setOpen] = useMergedState<boolean>(defaultOpen, {
    value: isOpen,
    onChange: onOpenChange
  });

  const getNewImageSpace = useCallback((children: ReactNode | (() => ReactNode)) => {
    children = typeof children == 'function' ? children() : children;
    const imageSpace = Array.isArray(children) ? children[0] : children;
    const { display, value, ...restProps } = imageSpace.props as ImageSpaceProps;
    return {
      ...imageSpace,
      props: {
        display: open ? display : 'none',
        value: open ? value : [],
        ...restProps,
      },
    };
  }, [open]);

  return (
    <Modal
      title={title}
      width={'fit-content'}
      closable={!!title}
      {...restModalProps}
      styles={{
        ...styles,
        content: {
          width: 'fit-content',
          ...styles?.content,
        }
      }}
      footer={null}
      open={open}
      onCancel={(e) => {
        onCancel?.(e);
        setOpen(false);
      }}
    >
      {getNewImageSpace(children)}
    </Modal>
  )
};

type CompoundedComponent = typeof InternalImageSpace & {
  Popover: typeof ImageSpacePopover;
  Modal: typeof ImageSpaceModal;
  Uploader: typeof PicUploader;
};
const ImageSpace = InternalImageSpace as CompoundedComponent;
ImageSpace.Popover = ImageSpacePopover;
ImageSpace.Modal = ImageSpaceModal;
ImageSpace.Uploader = PicUploader;

export type {
  ImageSpaceProps,
  ImageFile, FolderTreeType, ImageSpaceRef, BaseRequestParam,
  DisplayPanelType, FolderType, UploadResponseBody
};
export default ImageSpace;