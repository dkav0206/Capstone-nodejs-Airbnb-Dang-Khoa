/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *      tags: [Auth]
 *      parameters:
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  pass_word:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  birth_day:
 *                      type: string
 *                  gender:
 *                      type: string
 *                  role:
 *                      type: string
 *      responses:
 *          200: 
 *              description: success   
 */

/**
 * @swagger
 * /api/auth/signin:
 *  post:
 *      tags: [Auth]
 *      parameters:
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:  
 *                  email:
 *                      type: string
 *                  pass_word:
 *                      type: string
 *      responses:
 *          200: 
 *              description: success   
 */

/**
 * @swagger
 * /api/binh-luan:
 *  get:
 *      tags: [BinhLuan]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */

/**
 * @swagger
 * /api/binh-luan:
 *  post:
 *      tags: [BinhLuan]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: body
 *        name: model
 *        schema:
 *          type: object
 *          properties:  
 *              ma_phong:
 *                  type: integer
 *              noi_dung:
 *                  type: string
 *              sao_binh_luan:
 *                  type: integer
 *      responses:
 *          200: 
 *              description: success   
 */

/**
 * @swagger
 * /api/binh-luan/{id}:
 *  put:
 *      tags: [BinhLuan]
 *      parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *      - in: header
 *        name: token
 *        type: string
 *      - in: body
 *        name: model
 *        schema:
 *          type: object
 *          properties:  
 *              ma_phong:
 *                  type: integer
 *              noi_dung:
 *                  type: string
 *              sao_binh_luan:
 *                  type: integer
 *      responses:
 *          200: 
 *              description: success   
 */

/**
 * @swagger
 * /api/binh-luan/{id}:
 *  delete:
 *      tags: [BinhLuan]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: id
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/binh-luan/lay-binh-luan-theo-phong/{ma_phong}:
 *  get:
 *      tags: [BinhLuan]
 *      parameters:
 *      - in: path
 *        name: ma_phong
 *        type: integer
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/dat-phong:
 *  get:
 *      tags: [DatPhong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/dat-phong:
 *  post:
 *      tags: [DatPhong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: body
 *        name: model
 *        schema:
 *          type: object
 *          properties:  
 *              ma_phong:
 *                  type: integer
 *              ngay_den:
 *                  type: string
 *              ngay_di:
 *                  type: string
 *              so_luong_khach:
 *                  type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/dat-phong/{id}:
 *  get:
 *      tags: [DatPhong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: id
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/dat-phong/{id}:
 *  put:
 *      tags: [DatPhong]
 *      parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *      - in: header
 *        name: token
 *        type: string
 *      - in: body
 *        name: model
 *        schema:
 *          type: object
 *          properties:  
 *              ma_phong:
 *                  type: integer
 *              ngay_den:
 *                  type: string
 *              ngay_di:
 *                  type: string
 *              so_luong_khach:
 *                  type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/dat-phong/{id}:
 *  delete:
 *      tags: [DatPhong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: id
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/dat-phong/lay-theo-nguoi-dung/{ma_nguoi_dat}:
 *  get:
 *      tags: [DatPhong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: ma_nguoi_dat
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/users:
 *  get:
 *      tags: [NguoiDung]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/users:
 *  post:
 *      tags: [NguoiDung]
 *      parameters:
 *        - in: header
 *          name: token
 *          type: string
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  pass_word:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  birth_day:
 *                      type: string
 *                  gender:
 *                      type: string
 *                  role:
 *                      type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/users:
 *  delete:
 *      tags: [NguoiDung]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: query
 *        name: id
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/users/phan-trang-tim-kiem:
 *  get:
 *      tags: [NguoiDung]
 *      parameters:
 *      - in: query
 *        name: pageIndex
 *        type: integer
 *      - in: query
 *        name: pageSize
 *        type: integer
 *      - in: query
 *        name: keyword
 *        type: string
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      tags: [NguoiDung]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: id
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/users/:
 *  put:
 *      tags: [NguoiDung]
 *      parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *        - in: header
 *          name: token
 *          type: string
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  email:
 *                      type: string
 *                  pass_word:
 *                      type: string
 *                  phone:
 *                      type: string
 *                  birth_day:
 *                      type: string
 *                  gender:
 *                      type: string
 *                  role:
 *                      type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/users/search/{name}:
 *  get:
 *      tags: [NguoiDung]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: name
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/users/upload-avatar:
 *  post:
 *      tags: [NguoiDung]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: formData
 *        name: formFile
 *        type: file
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/phong-thue:
 *  get:
 *      tags: [Phong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/phong-thue:
 *  post:
 *      tags: [Phong]
 *      parameters:
 *        - in: header
 *          name: token
 *          type: string
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:
 *                  ten_phong:
 *                      type: string
 *                  khach:
 *                      type: integer
 *                  phong_ngu:
 *                      type: integer
 *                  giuong:
 *                      type: integer
 *                  phong_tam:
 *                      type: integer
 *                  mo_ta:
 *                      type: string
 *                  gia_tien:
 *                      type: integer
 *                  may_giat:
 *                      type: boolean
 *                  ban_la:
 *                      type: boolean
 *                  tivi:
 *                      type: boolean
 *                  dieu_hoa:
 *                      type: boolean
 *                  wifi:
 *                      type: boolean
 *                  bep:
 *                      type: boolean
 *                  do_xe:
 *                      type: boolean
 *                  ho_boi:
 *                      type: boolean
 *                  ban_ui:
 *                      type: boolean
 *                  ma_vi_tri:
 *                      type: integer
 *                  hinh_anh:
 *                      type: string
 *      responses:
 *          200: 
 *              description: success   
 */

/**
 * @swagger
 * /api/phong-thue/lay-phong-theo-vi-tri:
 *  get:
 *      tags: [Phong]
 *      parameters:
 *      - in: query
 *        name: ma_vi_tri
 *        type: integer
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/phong-thue/phan-trang-tim-kiem:
 *  get:
 *      tags: [Phong]
 *      parameters:
 *      - in: query
 *        name: pageIndex
 *        type: integer
 *      - in: query
 *        name: pageSize
 *        type: integer
 *      - in: query
 *        name: keyword
 *        type: string
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/phong-thue/{id}:
 *  get:
 *      tags: [Phong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: id
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/phong-thue/{id}:
 *  put:
 *      tags: [Phong]
 *      parameters:
 *        - in: path
 *          name: id
 *          type: integer
 *        - in: header
 *          name: token
 *          type: string
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:
 *                  ten_phong:
 *                      type: string
 *                  khach:
 *                      type: integer
 *                  phong_ngu:
 *                      type: integer
 *                  giuong:
 *                      type: integer
 *                  phong_tam:
 *                      type: integer
 *                  mo_ta:
 *                      type: string
 *                  gia_tien:
 *                      type: integer
 *                  may_giat:
 *                      type: boolean
 *                  ban_la:
 *                      type: boolean
 *                  tivi:
 *                      type: boolean
 *                  dieu_hoa:
 *                      type: boolean
 *                  wifi:
 *                      type: boolean
 *                  bep:
 *                      type: boolean
 *                  do_xe:
 *                      type: boolean
 *                  ho_boi:
 *                      type: boolean
 *                  ban_ui:
 *                      type: boolean
 *                  ma_vi_tri:
 *                      type: integer
 *                  hinh_anh:
 *                      type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/phong-thue/{id}:
 *  delete:
 *      tags: [Phong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: id
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/phong-thue/upload-hinh-phong:
 *  post:
 *      tags: [Phong]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: query
 *        name: id
 *        type: integer
 *      - in: formData
 *        name: formFile
 *        type: file
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/vi-tri:
 *  get:
 *      tags: [Vitri]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/vi-tri:
 *  post:
 *      tags: [Vitri]
 *      parameters:
 *        - in: header
 *          name: token
 *          type: string
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:
 *                  ten_vi_tri:
 *                      type: string
 *                  tinh_thanh:
 *                      type: string
 *                  quoc_gia:
 *                      type: string
 *                  hinh_anh:
 *                      type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/vi-tri/phan-trang-tim-kiem:
 *  get:
 *      tags: [Vitri]
 *      parameters:
 *      - in: query
 *        name: pageIndex
 *        type: integer
 *      - in: query
 *        name: pageSize
 *        type: integer
 *      - in: query
 *        name: keyword
 *        type: string
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/vi-tri/{id}:
 *  get:
 *      tags: [Vitri]
 *      parameters:
 *      - in: path
 *        name: id
 *        type: integer
 *      - in: header
 *        name: token
 *        type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/vi-tri/{id}:
 *  put:
 *      tags: [Vitri]
 *      parameters:
 *        - in: header
 *          name: token
 *          type: string
 *        - in: path
 *          name: id
 *          type: integer
 *        - in: body
 *          name: model
 *          schema:
 *              type: object
 *              properties:
 *                  ten_vi_tri:
 *                      type: string
 *                  tinh_thanh:
 *                      type: string
 *                  quoc_gia:
 *                      type: string
 *                  hinh_anh:
 *                      type: string
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/vi-tri/{id}:
 *  delete:
 *      tags: [Vitri]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: path
 *        name: id
 *        type: integer
 *      responses:
 *          200: 
 *              description: success   
 */


/**
 * @swagger
 * /api/vi-tri/upload-avatar:
 *  post:
 *      tags: [Vitri]
 *      parameters:
 *      - in: header
 *        name: token
 *        type: string
 *      - in: query
 *        name: id
 *        type: integer
 *      - in: formData
 *        name: formFile
 *        type: file
 *      responses:
 *          200: 
 *              description: success   
 */