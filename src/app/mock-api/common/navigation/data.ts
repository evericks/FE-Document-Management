/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/dashboard'
            }
        ]
    },
    {
        id: 'incoming-documents',
        title: 'Văn Bản Đến',
        type: 'group',
        children: [
            {
                id: 'incoming-documents.reception-and-registration',
                title: 'Tiếp Nhận & Đăng Ký',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-down',
                children: [
                    {
                        id: 'incoming-documents.receive',
                        title: 'Tiếp Nhận Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/receive'
                    },
                    {
                        id: 'incoming-documents.classify',
                        title: 'Phân Loại Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/classify'
                    },
                    {
                        id: 'incoming-documents.register',
                        title: 'Đăng Ký Văn Bản Đến',
                        type: 'basic',
                        link: '/incoming-documents/register'
                    },
                ]
            },
            {
                id: 'incoming-documents.processing',
                title: 'Xử Lý',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'incoming-documents.manage-and-process',
                        title: 'Quản Lý & Xử Lý',
                        type: 'basic',
                        link: '/incoming-documents/manage-and-process'
                    },
                    {
                        id: 'incoming-documents.tracking',
                        title: 'Theo Dõi Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/tracking'
                    },
                ]
            },
            {
                id: 'incoming-documents.storage',
                title: 'Lưu Trữ',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'incoming-documents.temporary-storage',
                        title: 'Lưu Trữ Ngắn Hạn',
                        type: 'basic',
                        link: '/incoming-documents/temporary-storage'
                    },
                    {
                        id: 'incoming-documents.long-term-storage',
                        title: 'Lưu Trữ Dài Hạn',
                        type: 'basic',
                        link: '/incoming-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'outgoing-documents',
        title: 'Văn Bản Đi',
        type: 'group',
        children: [
            {
                id: 'outgoing-documents.editing-and-publishing',
                title: 'Tạo Và Gửi Văn Bản',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-up',
                children: [
                    {
                        id: 'outgoing-documents.editings',
                        title: 'Văn Bản Nháp',
                        type: 'basic',
                        link: '/outgoing-documents/editings'
                    },
                    {
                        id: 'outgoing-documents.confirm-and-approve',
                        title: 'Phê Duyệt Văn Bản',
                        type: 'basic',
                        link: '/outgoing-documents/confirm-and-approve'
                    },
                    {
                        id: 'outgoing-documents.register',
                        title: 'Đăng Ký Văn Bản Đi',
                        type: 'basic',
                        link: '/outgoing-documents/register'
                    },
                ]
            },
            {
                id: 'outgoing-documents.storage',
                title: 'Lưu Trữ',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'outgoing-documents.temporary-storage',
                        title: 'Lưu Trữ Ngắn Hạn',
                        type: 'basic',
                        link: '/outgoing-documents/temporary-storage'
                    },
                    {
                        id: 'outgoing-documents.long-term-storage',
                        title: 'Lưu Trữ Dài Hạn',
                        type: 'basic',
                        link: '/outgoing-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'settings',
        title: 'Cài Đặt',
        type: 'group',
        children: [
            {
                id: 'documents',
                title: 'Văn Bản',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document',
                link: '/settings/documents'
            },
            {
                id: 'users',
                title: 'Nhân Viên',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/settings/users'
            },
            {
                id: 'roles',
                title: 'Chức Vụ',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/settings/roles'
            },
            {
                id: 'departments',
                title: 'Phòng Ban',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/settings/departments'
            },
            {
                id: 'document-types',
                title: 'Loại Văn Bản',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/settings/document-types'
            },
            {
                id: 'processes',
                title: 'Quy Trình Xử Lý',
                type: 'basic',
                icon: 'heroicons_outline:share',
                link: '/settings/processes'
            },
            {
                id: 'organizations',
                title: 'Cơ Quan Ban Hành',
                type: 'basic',
                icon: 'heroicons_outline:building-office',
                link: '/settings/organizations'
            }
        ]
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/dashboard'
            }
        ]
    },
    {
        id: 'incoming-documents',
        title: 'Văn Bản Đến',
        type: 'group',
        children: [
            {
                id: 'incoming-documents.reception-and-registration',
                title: 'Tiếp Nhận & Đăng Ký',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-down',
                children: [
                    {
                        id: 'incoming-documents.receive',
                        title: 'Tiếp Nhận Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/receive'
                    },
                    {
                        id: 'incoming-documents.classify',
                        title: 'Phân Loại Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/classify'
                    },
                    {
                        id: 'incoming-documents.register',
                        title: 'Đăng Ký Văn Bản Đến',
                        type: 'basic',
                        link: '/incoming-documents/register'
                    },
                ]
            },
            {
                id: 'incoming-documents.processing',
                title: 'Xử Lý',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'incoming-documents.manage-and-process',
                        title: 'Quản Lý & Xử Lý',
                        type: 'basic',
                        link: '/incoming-documents/manage-and-process'
                    },
                    {
                        id: 'incoming-documents.tracking',
                        title: 'Theo Dõi Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/tracking'
                    },
                ]
            },
            {
                id: 'incoming-documents.storage',
                title: 'Lưu Trữ',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'incoming-documents.temporary-storage',
                        title: 'Lưu Trữ Ngắn Hạn',
                        type: 'basic',
                        link: '/incoming-documents/temporary-storage'
                    },
                    {
                        id: 'incoming-documents.long-term-storage',
                        title: 'Lưu Trữ Dài Hạn',
                        type: 'basic',
                        link: '/incoming-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'outgoing-documents',
        title: 'Văn Bản Đi',
        type: 'group',
        children: [
            {
                id: 'outgoing-documents.editing-and-publishing',
                title: 'Tạo Và Gửi Văn Bản',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-up',
                children: [
                    {
                        id: 'outgoing-documents.editings',
                        title: 'Văn Bản Nháp',
                        type: 'basic',
                        link: '/outgoing-documents/editings'
                    },
                    {
                        id: 'outgoing-documents.confirm-and-approve',
                        title: 'Phê Duyệt Văn Bản',
                        type: 'basic',
                        link: '/outgoing-documents/confirm-and-approve'
                    },
                    {
                        id: 'outgoing-documents.register',
                        title: 'Đăng Ký Văn Bản Đi',
                        type: 'basic',
                        link: '/outgoing-documents/register'
                    },
                ]
            },
            {
                id: 'outgoing-documents.storage',
                title: 'Lưu Trữ',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'outgoing-documents.temporary-storage',
                        title: 'Lưu Trữ Ngắn Hạn',
                        type: 'basic',
                        link: '/outgoing-documents/temporary-storage'
                    },
                    {
                        id: 'outgoing-documents.long-term-storage',
                        title: 'Lưu Trữ Dài Hạn',
                        type: 'basic',
                        link: '/outgoing-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'settings',
        title: 'Cài Đặt',
        type: 'group',
        children: [
            {
                id: 'documents',
                title: 'Văn Bản',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document',
                link: '/settings/documents'
            },
            {
                id: 'users',
                title: 'Nhân Viên',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/settings/users'
            },
            {
                id: 'roles',
                title: 'Chức Vụ',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/settings/roles'
            },
            {
                id: 'departments',
                title: 'Phòng Ban',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/settings/departments'
            },
            {
                id: 'document-types',
                title: 'Loại Văn Bản',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/settings/document-types'
            },
            {
                id: 'processes',
                title: 'Quy Trình Xử Lý',
                type: 'basic',
                icon: 'heroicons_outline:share',
                link: '/settings/processes'
            },
            {
                id: 'organizations',
                title: 'Cơ Quan Ban Hành',
                type: 'basic',
                icon: 'heroicons_outline:building-office',
                link: '/settings/organizations'
            }
        ]
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/dashboard'
            }
        ]
    },
    {
        id: 'incoming-documents',
        title: 'Văn Bản Đến',
        type: 'group',
        children: [
            {
                id: 'incoming-documents.reception-and-registration',
                title: 'Tiếp Nhận & Đăng Ký',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-down',
                children: [
                    {
                        id: 'incoming-documents.receive',
                        title: 'Tiếp Nhận Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/receive'
                    },
                    {
                        id: 'incoming-documents.classify',
                        title: 'Phân Loại Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/classify'
                    },
                    {
                        id: 'incoming-documents.register',
                        title: 'Đăng Ký Văn Bản Đến',
                        type: 'basic',
                        link: '/incoming-documents/register'
                    },
                ]
            },
            {
                id: 'incoming-documents.processing',
                title: 'Xử Lý',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'incoming-documents.manage-and-process',
                        title: 'Quản Lý & Xử Lý',
                        type: 'basic',
                        link: '/incoming-documents/manage-and-process'
                    },
                    {
                        id: 'incoming-documents.tracking',
                        title: 'Theo Dõi Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/tracking'
                    },
                ]
            },
            {
                id: 'incoming-documents.storage',
                title: 'Lưu Trữ',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'incoming-documents.temporary-storage',
                        title: 'Lưu Trữ Ngắn Hạn',
                        type: 'basic',
                        link: '/incoming-documents/temporary-storage'
                    },
                    {
                        id: 'incoming-documents.long-term-storage',
                        title: 'Lưu Trữ Dài Hạn',
                        type: 'basic',
                        link: '/incoming-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'outgoing-documents',
        title: 'Văn Bản Đi',
        type: 'group',
        children: [
            {
                id: 'outgoing-documents.editing-and-publishing',
                title: 'Tạo Và Gửi Văn Bản',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-up',
                children: [
                    {
                        id: 'outgoing-documents.editings',
                        title: 'Văn Bản Nháp',
                        type: 'basic',
                        link: '/outgoing-documents/editings'
                    },
                    {
                        id: 'outgoing-documents.confirm-and-approve',
                        title: 'Phê Duyệt Văn Bản',
                        type: 'basic',
                        link: '/outgoing-documents/confirm-and-approve'
                    },
                    {
                        id: 'outgoing-documents.register',
                        title: 'Đăng Ký Văn Bản Đi',
                        type: 'basic',
                        link: '/outgoing-documents/register'
                    },
                ]
            },
            {
                id: 'outgoing-documents.storage',
                title: 'Lưu Trữ',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'outgoing-documents.temporary-storage',
                        title: 'Lưu Trữ Ngắn Hạn',
                        type: 'basic',
                        link: '/outgoing-documents/temporary-storage'
                    },
                    {
                        id: 'outgoing-documents.long-term-storage',
                        title: 'Lưu Trữ Dài Hạn',
                        type: 'basic',
                        link: '/outgoing-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'settings',
        title: 'Cài Đặt',
        type: 'group',
        children: [
            {
                id: 'documents',
                title: 'Văn Bản',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document',
                link: '/settings/documents'
            },
            {
                id: 'users',
                title: 'Nhân Viên',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/settings/users'
            },
            {
                id: 'roles',
                title: 'Chức Vụ',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/settings/roles'
            },
            {
                id: 'departments',
                title: 'Phòng Ban',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/settings/departments'
            },
            {
                id: 'document-types',
                title: 'Loại Văn Bản',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/settings/document-types'
            },
            {
                id: 'processes',
                title: 'Quy Trình Xử Lý',
                type: 'basic',
                icon: 'heroicons_outline:share',
                link: '/settings/processes'
            },
            {
                id: 'organizations',
                title: 'Cơ Quan Ban Hành',
                type: 'basic',
                icon: 'heroicons_outline:building-office',
                link: '/settings/organizations'
            }
        ]
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                type: 'basic',
                icon: 'heroicons_outline:chart-pie',
                link: '/dashboard'
            }
        ]
    },
    {
        id: 'incoming-documents',
        title: 'Văn Bản Đến',
        type: 'group',
        children: [
            {
                id: 'incoming-documents.reception-and-registration',
                title: 'Tiếp Nhận & Đăng Ký',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-down',
                children: [
                    {
                        id: 'incoming-documents.receive',
                        title: 'Tiếp Nhận Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/receive'
                    },
                    {
                        id: 'incoming-documents.classify',
                        title: 'Phân Loại Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/classify'
                    },
                    {
                        id: 'incoming-documents.register',
                        title: 'Đăng Ký Văn Bản Đến',
                        type: 'basic',
                        link: '/incoming-documents/register'
                    },
                ]
            },
            {
                id: 'incoming-documents.processing',
                title: 'Xử Lý',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'incoming-documents.manage-and-process',
                        title: 'Quản Lý & Xử Lý',
                        type: 'basic',
                        link: '/incoming-documents/manage-and-process'
                    },
                    {
                        id: 'incoming-documents.tracking',
                        title: 'Theo Dõi Văn Bản',
                        type: 'basic',
                        link: '/incoming-documents/tracking'
                    },
                ]
            },
            {
                id: 'incoming-documents.storage',
                title: 'Lưu Trữ',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'incoming-documents.temporary-storage',
                        title: 'Lưu Trữ Ngắn Hạn',
                        type: 'basic',
                        link: '/incoming-documents/temporary-storage'
                    },
                    {
                        id: 'incoming-documents.long-term-storage',
                        title: 'Lưu Trữ Dài Hạn',
                        type: 'basic',
                        link: '/incoming-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'outgoing-documents',
        title: 'Văn Bản Đi',
        type: 'group',
        children: [
            {
                id: 'outgoing-documents.editing-and-publishing',
                title: 'Tạo Và Gửi Văn Bản',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-up',
                children: [
                    {
                        id: 'outgoing-documents.editings',
                        title: 'Văn Bản Nháp',
                        type: 'basic',
                        link: '/outgoing-documents/editings'
                    },
                    {
                        id: 'outgoing-documents.confirm-and-approve',
                        title: 'Phê Duyệt Văn Bản',
                        type: 'basic',
                        link: '/outgoing-documents/confirm-and-approve'
                    },
                    {
                        id: 'outgoing-documents.register',
                        title: 'Đăng Ký Văn Bản Đi',
                        type: 'basic',
                        link: '/outgoing-documents/register'
                    },
                ]
            },
            {
                id: 'outgoing-documents.storage',
                title: 'Lưu Trữ',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'outgoing-documents.temporary-storage',
                        title: 'Lưu Trữ Ngắn Hạn',
                        type: 'basic',
                        link: '/outgoing-documents/temporary-storage'
                    },
                    {
                        id: 'outgoing-documents.long-term-storage',
                        title: 'Lưu Trữ Dài Hạn',
                        type: 'basic',
                        link: '/outgoing-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'settings',
        title: 'Cài Đặt',
        type: 'group',
        children: [
            {
                id: 'documents',
                title: 'Văn Bản',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document',
                link: '/settings/documents'
            },
            {
                id: 'users',
                title: 'Nhân Viên',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/settings/users'
            },
            {
                id: 'roles',
                title: 'Chức Vụ',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/settings/roles'
            },
            {
                id: 'departments',
                title: 'Phòng Ban',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/settings/departments'
            },
            {
                id: 'document-types',
                title: 'Loại Văn Bản',
                type: 'basic',
                icon: 'heroicons_outline:document-text',
                link: '/settings/document-types'
            },
            {
                id: 'processes',
                title: 'Quy Trình Xử Lý',
                type: 'basic',
                icon: 'heroicons_outline:share',
                link: '/settings/processes'
            },
            {
                id: 'organizations',
                title: 'Cơ Quan Ban Hành',
                type: 'basic',
                icon: 'heroicons_outline:building-office',
                link: '/settings/organizations'
            }
        ]
    },
];
