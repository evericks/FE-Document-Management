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
        title: 'Incoming Documents',
        type: 'group',
        children: [
            {
                id: 'incoming-documents.reception-and-registration',
                title: 'Reception & Registration',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-down',
                children: [
                    {
                        id: 'incoming-documents.receive',
                        title: 'Receive Documents',
                        type: 'basic',
                        link: '/incoming-documents/receive'
                    },
                    {
                        id: 'incoming-documents.classify',
                        title: 'Classify Documents',
                        type: 'basic',
                        link: '/incoming-documents/classify'
                    },
                    {
                        id: 'incoming-documents.register',
                        title: 'Register Documents',
                        type: 'basic',
                        link: '/incoming-documents/register'
                    },
                    {
                        id: 'incoming-documents.distribution',
                        title: 'Distribution Documents',
                        type: 'basic',
                        link: '/incoming-documents/distribution'
                    },
                ]
            },
            {
                id: 'incoming-documents.processing',
                title: 'Processing',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'incoming-documents.manage-and-process',
                        title: 'Manage & Process',
                        type: 'basic',
                        link: '/incoming-documents/manage-and-process'
                    },
                    {
                        id: 'incoming-documents.darft-and-feedback',
                        title: 'Draft & Feedback',
                        type: 'basic',
                        link: '/incoming-documents/darft-and-feedback'
                    },
                    {
                        id: 'incoming-documents.tracking',
                        title: 'Tracking Documents',
                        type: 'basic',
                        link: '/incoming-documents/tracking'
                    },
                ]
            },
            {
                id: 'incoming-documents.storage',
                title: 'Storage',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'incoming-documents.temporary-storage',
                        title: 'Temporary Storage',
                        type: 'basic',
                        link: '/incoming-documents/temporary-storage'
                    },
                    {
                        id: 'incoming-documents.long-term-storage',
                        title: 'Long-term Storage',
                        type: 'basic',
                        link: '/incoming-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'outgoing-documents',
        title: 'Outgoing Documents',
        type: 'group',
        children: [
            {
                id: 'outgoing-documents.editing-and-publishing',
                title: 'Editing and Publishing',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-up',
                children: [
                    {
                        id: 'outgoing-documents.editings',
                        title: 'Editting Documents',
                        type: 'basic',
                        link: '/outgoing-documents/editings'
                    },
                    {
                        id: 'outgoing-documents.confirm-and-approve',
                        title: 'Confirm & Approve',
                        type: 'basic',
                        link: '/outgoing-documents/confirm-and-approve'
                    },
                    {
                        id: 'outgoing-documents.register',
                        title: 'Register Documents',
                        type: 'basic',
                        link: '/outgoing-documents/register'
                    },
                ]
            },
            {
                id: 'outgoing-documents.tracking',
                title: 'Tracking',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'outgoing-documents.tracking-process',
                        title: 'Tracking Process',
                        type: 'basic',
                        link: '/outgoing-documents/tracking-process'
                    },
                    {
                        id: 'outgoing-documents.tracking-feedback',
                        title: 'Tracking Feedback',
                        type: 'basic',
                        link: '/outgoing-documents/tracking-feedback'
                    },
                ]
            },
            {
                id: 'outgoing-documents.storage',
                title: 'Storage',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'outgoing-documents.temporary-storage',
                        title: 'Temporary Storage',
                        type: 'basic',
                        link: '/outgoing-documents/temporary-storage'
                    },
                    {
                        id: 'outgoing-documents.long-term-storage',
                        title: 'Long-term Storage',
                        type: 'basic',
                        link: '/outgoing-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'settings',
        title: 'Setting',
        type: 'group',
        children: [
            {
                id: 'users',
                title: 'User',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/settings/users'
            },
            {
                id: 'roles',
                title: 'Role',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/settings/roles'
            },
            {
                id: 'departments',
                title: 'Department',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/settings/departments'
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
        title: 'Incoming Documents',
        type: 'group',
        children: [
            {
                id: 'incoming-documents.reception-and-registration',
                title: 'Reception & Registration',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-down',
                children: [
                    {
                        id: 'incoming-documents.receive',
                        title: 'Receive Documents',
                        type: 'basic',
                        link: '/incoming-documents/receive'
                    },
                    {
                        id: 'incoming-documents.classify',
                        title: 'Classify Documents',
                        type: 'basic',
                        link: '/incoming-documents/classify'
                    },
                    {
                        id: 'incoming-documents.register',
                        title: 'Register Documents',
                        type: 'basic',
                        link: '/incoming-documents/register'
                    },
                    {
                        id: 'incoming-documents.distribution',
                        title: 'Distribution Documents',
                        type: 'basic',
                        link: '/incoming-documents/distribution'
                    },
                ]
            },
            {
                id: 'incoming-documents.processing',
                title: 'Processing',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'incoming-documents.manage-and-process',
                        title: 'Manage & Process',
                        type: 'basic',
                        link: '/incoming-documents/manage-and-process'
                    },
                    {
                        id: 'incoming-documents.darft-and-feedback',
                        title: 'Draft & Feedback',
                        type: 'basic',
                        link: '/incoming-documents/darft-and-feedback'
                    },
                    {
                        id: 'incoming-documents.tracking',
                        title: 'Tracking Documents',
                        type: 'basic',
                        link: '/incoming-documents/tracking'
                    },
                ]
            },
            {
                id: 'incoming-documents.storage',
                title: 'Storage',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'incoming-documents.temporary-storage',
                        title: 'Temporary Storage',
                        type: 'basic',
                        link: '/incoming-documents/temporary-storage'
                    },
                    {
                        id: 'incoming-documents.long-term-storage',
                        title: 'Long-term Storage',
                        type: 'basic',
                        link: '/incoming-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'outgoing-documents',
        title: 'Outgoing Documents',
        type: 'group',
        children: [
            {
                id: 'outgoing-documents.editing-and-publishing',
                title: 'Editing and Publishing',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-up',
                children: [
                    {
                        id: 'outgoing-documents.editings',
                        title: 'Editting Documents',
                        type: 'basic',
                        link: '/outgoing-documents/editings'
                    },
                    {
                        id: 'outgoing-documents.confirm-and-approve',
                        title: 'Confirm & Approve',
                        type: 'basic',
                        link: '/outgoing-documents/confirm-and-approve'
                    },
                    {
                        id: 'outgoing-documents.register',
                        title: 'Register Documents',
                        type: 'basic',
                        link: '/outgoing-documents/register'
                    },
                ]
            },
            {
                id: 'outgoing-documents.tracking',
                title: 'Tracking',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'outgoing-documents.tracking-process',
                        title: 'Tracking Process',
                        type: 'basic',
                        link: '/outgoing-documents/tracking-process'
                    },
                    {
                        id: 'outgoing-documents.tracking-feedback',
                        title: 'Tracking Feedback',
                        type: 'basic',
                        link: '/outgoing-documents/tracking-feedback'
                    },
                ]
            },
            {
                id: 'outgoing-documents.storage',
                title: 'Storage',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'outgoing-documents.temporary-storage',
                        title: 'Temporary Storage',
                        type: 'basic',
                        link: '/outgoing-documents/temporary-storage'
                    },
                    {
                        id: 'outgoing-documents.long-term-storage',
                        title: 'Long-term Storage',
                        type: 'basic',
                        link: '/outgoing-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'settings',
        title: 'Setting',
        type: 'group',
        children: [
            {
                id: 'users',
                title: 'User',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/settings/users'
            },
            {
                id: 'roles',
                title: 'Role',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/settings/roles'
            },
            {
                id: 'departments',
                title: 'Department',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/settings/departments'
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
        title: 'Incoming Documents',
        type: 'group',
        children: [
            {
                id: 'incoming-documents.reception-and-registration',
                title: 'Reception & Registration',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-down',
                children: [
                    {
                        id: 'incoming-documents.receive',
                        title: 'Receive Documents',
                        type: 'basic',
                        link: '/incoming-documents/receive'
                    },
                    {
                        id: 'incoming-documents.classify',
                        title: 'Classify Documents',
                        type: 'basic',
                        link: '/incoming-documents/classify'
                    },
                    {
                        id: 'incoming-documents.register',
                        title: 'Register Documents',
                        type: 'basic',
                        link: '/incoming-documents/register'
                    },
                    {
                        id: 'incoming-documents.distribution',
                        title: 'Distribution Documents',
                        type: 'basic',
                        link: '/incoming-documents/distribution'
                    },
                ]
            },
            {
                id: 'incoming-documents.processing',
                title: 'Processing',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'incoming-documents.manage-and-process',
                        title: 'Manage & Process',
                        type: 'basic',
                        link: '/incoming-documents/manage-and-process'
                    },
                    {
                        id: 'incoming-documents.darft-and-feedback',
                        title: 'Draft & Feedback',
                        type: 'basic',
                        link: '/incoming-documents/darft-and-feedback'
                    },
                    {
                        id: 'incoming-documents.tracking',
                        title: 'Tracking Documents',
                        type: 'basic',
                        link: '/incoming-documents/tracking'
                    },
                ]
            },
            {
                id: 'incoming-documents.storage',
                title: 'Storage',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'incoming-documents.temporary-storage',
                        title: 'Temporary Storage',
                        type: 'basic',
                        link: '/incoming-documents/temporary-storage'
                    },
                    {
                        id: 'incoming-documents.long-term-storage',
                        title: 'Long-term Storage',
                        type: 'basic',
                        link: '/incoming-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'outgoing-documents',
        title: 'Outgoing Documents',
        type: 'group',
        children: [
            {
                id: 'outgoing-documents.editing-and-publishing',
                title: 'Editing and Publishing',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-up',
                children: [
                    {
                        id: 'outgoing-documents.editings',
                        title: 'Editting Documents',
                        type: 'basic',
                        link: '/outgoing-documents/editings'
                    },
                    {
                        id: 'outgoing-documents.confirm-and-approve',
                        title: 'Confirm & Approve',
                        type: 'basic',
                        link: '/outgoing-documents/confirm-and-approve'
                    },
                    {
                        id: 'outgoing-documents.register',
                        title: 'Register Documents',
                        type: 'basic',
                        link: '/outgoing-documents/register'
                    },
                ]
            },
            {
                id: 'outgoing-documents.tracking',
                title: 'Tracking',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'outgoing-documents.tracking-process',
                        title: 'Tracking Process',
                        type: 'basic',
                        link: '/outgoing-documents/tracking-process'
                    },
                    {
                        id: 'outgoing-documents.tracking-feedback',
                        title: 'Tracking Feedback',
                        type: 'basic',
                        link: '/outgoing-documents/tracking-feedback'
                    },
                ]
            },
            {
                id: 'outgoing-documents.storage',
                title: 'Storage',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'outgoing-documents.temporary-storage',
                        title: 'Temporary Storage',
                        type: 'basic',
                        link: '/outgoing-documents/temporary-storage'
                    },
                    {
                        id: 'outgoing-documents.long-term-storage',
                        title: 'Long-term Storage',
                        type: 'basic',
                        link: '/outgoing-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'settings',
        title: 'Setting',
        type: 'group',
        children: [
            {
                id: 'users',
                title: 'User',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/settings/users'
            },
            {
                id: 'roles',
                title: 'Role',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/settings/roles'
            },
            {
                id: 'departments',
                title: 'Department',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/settings/departments'
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
        title: 'Incoming Documents',
        type: 'group',
        children: [
            {
                id: 'incoming-documents.reception-and-registration',
                title: 'Reception & Registration',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-down',
                children: [
                    {
                        id: 'incoming-documents.receive',
                        title: 'Receive Documents',
                        type: 'basic',
                        link: '/incoming-documents/receive'
                    },
                    {
                        id: 'incoming-documents.classify',
                        title: 'Classify Documents',
                        type: 'basic',
                        link: '/incoming-documents/classify'
                    },
                    {
                        id: 'incoming-documents.register',
                        title: 'Register Documents',
                        type: 'basic',
                        link: '/incoming-documents/register'
                    },
                    {
                        id: 'incoming-documents.distribution',
                        title: 'Distribution Documents',
                        type: 'basic',
                        link: '/incoming-documents/distribution'
                    },
                ]
            },
            {
                id: 'incoming-documents.processing',
                title: 'Processing',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'incoming-documents.manage-and-process',
                        title: 'Manage & Process',
                        type: 'basic',
                        link: '/incoming-documents/manage-and-process'
                    },
                    {
                        id: 'incoming-documents.darft-and-feedback',
                        title: 'Draft & Feedback',
                        type: 'basic',
                        link: '/incoming-documents/darft-and-feedback'
                    },
                    {
                        id: 'incoming-documents.tracking',
                        title: 'Tracking Documents',
                        type: 'basic',
                        link: '/incoming-documents/tracking'
                    },
                ]
            },
            {
                id: 'incoming-documents.storage',
                title: 'Storage',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'incoming-documents.temporary-storage',
                        title: 'Temporary Storage',
                        type: 'basic',
                        link: '/incoming-documents/temporary-storage'
                    },
                    {
                        id: 'incoming-documents.long-term-storage',
                        title: 'Long-term Storage',
                        type: 'basic',
                        link: '/incoming-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'outgoing-documents',
        title: 'Outgoing Documents',
        type: 'group',
        children: [
            {
                id: 'outgoing-documents.editing-and-publishing',
                title: 'Editing and Publishing',
                type: 'collapsable',
                icon: 'heroicons_outline:document-arrow-up',
                children: [
                    {
                        id: 'outgoing-documents.editings',
                        title: 'Editting Documents',
                        type: 'basic',
                        link: '/outgoing-documents/editings'
                    },
                    {
                        id: 'outgoing-documents.confirm-and-approve',
                        title: 'Confirm & Approve',
                        type: 'basic',
                        link: '/outgoing-documents/confirm-and-approve'
                    },
                    {
                        id: 'outgoing-documents.register',
                        title: 'Register Documents',
                        type: 'basic',
                        link: '/outgoing-documents/register'
                    },
                ]
            },
            {
                id: 'outgoing-documents.tracking',
                title: 'Tracking',
                type: 'collapsable',
                icon: 'heroicons_outline:document-magnifying-glass',
                children: [
                    {
                        id: 'outgoing-documents.tracking-process',
                        title: 'Tracking Process',
                        type: 'basic',
                        link: '/outgoing-documents/tracking-process'
                    },
                    {
                        id: 'outgoing-documents.tracking-feedback',
                        title: 'Tracking Feedback',
                        type: 'basic',
                        link: '/outgoing-documents/tracking-feedback'
                    },
                ]
            },
            {
                id: 'outgoing-documents.storage',
                title: 'Storage',
                type: 'collapsable',
                icon: 'heroicons_outline:document-chart-bar',
                children: [
                    {
                        id: 'outgoing-documents.temporary-storage',
                        title: 'Temporary Storage',
                        type: 'basic',
                        link: '/outgoing-documents/temporary-storage'
                    },
                    {
                        id: 'outgoing-documents.long-term-storage',
                        title: 'Long-term Storage',
                        type: 'basic',
                        link: '/outgoing-documents/long-term-storage'
                    }
                ]
            },
        ]
    },
    {
        id: 'settings',
        title: 'Setting',
        type: 'group',
        children: [
            {
                id: 'users',
                title: 'User',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/settings/users'
            },
            {
                id: 'roles',
                title: 'Role',
                type: 'basic',
                icon: 'heroicons_outline:star',
                link: '/settings/roles'
            },
            {
                id: 'departments',
                title: 'Department',
                type: 'basic',
                icon: 'heroicons_outline:home',
                link: '/settings/departments'
            }
        ]
    },
];
