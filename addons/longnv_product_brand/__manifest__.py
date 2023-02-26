# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).

{
    'name': 'Quản lý thương hiệu sản phẩm',
    'version': '13.0.0.0',
    'category': 'Product',
    'summary': "Quản lý thương hiệu sản phẩm",
    'author': 'longnv',
    'license': 'AGPL-3',
    'depends': [
        'sale',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/product_brand_view.xml',
    ],
    'installable': True,
    'auto_install': False
}
