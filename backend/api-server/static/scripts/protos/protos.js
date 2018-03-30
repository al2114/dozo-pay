/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pesto = (function() {

    /**
     * Namespace pesto.
     * @exports pesto
     * @namespace
     */
    var pesto = {};

    pesto.models = (function() {

        /**
         * Namespace models.
         * @memberof pesto
         * @namespace
         */
        var models = {};

        models.Claim = (function() {

            /**
             * Properties of a Claim.
             * @memberof pesto.models
             * @interface IClaim
             * @property {string|null} [identifier] Claim identifier
             * @property {string|null} [name] Claim name
             * @property {pesto.models.IUser|null} [owner] Claim owner
             */

            /**
             * Constructs a new Claim.
             * @memberof pesto.models
             * @classdesc Represents a Claim.
             * @implements IClaim
             * @constructor
             * @param {pesto.models.IClaim=} [properties] Properties to set
             */
            function Claim(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Claim identifier.
             * @member {string} identifier
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.identifier = "";

            /**
             * Claim name.
             * @member {string} name
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.name = "";

            /**
             * Claim owner.
             * @member {pesto.models.IUser|null|undefined} owner
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.owner = null;

            /**
             * Creates a new Claim instance using the specified properties.
             * @function create
             * @memberof pesto.models.Claim
             * @static
             * @param {pesto.models.IClaim=} [properties] Properties to set
             * @returns {pesto.models.Claim} Claim instance
             */
            Claim.create = function create(properties) {
                return new Claim(properties);
            };

            /**
             * Encodes the specified Claim message. Does not implicitly {@link pesto.models.Claim.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.Claim
             * @static
             * @param {pesto.models.IClaim} message Claim message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Claim.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.identifier != null && message.hasOwnProperty("identifier"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.identifier);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.owner != null && message.hasOwnProperty("owner"))
                    $root.pesto.models.User.encode(message.owner, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Claim message, length delimited. Does not implicitly {@link pesto.models.Claim.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.Claim
             * @static
             * @param {pesto.models.IClaim} message Claim message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Claim.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Claim message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.Claim
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.Claim} Claim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Claim.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.Claim();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.identifier = reader.string();
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        message.owner = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Claim message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.Claim
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.Claim} Claim
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Claim.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Claim message.
             * @function verify
             * @memberof pesto.models.Claim
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Claim.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.identifier != null && message.hasOwnProperty("identifier"))
                    if (!$util.isString(message.identifier))
                        return "identifier: string expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.owner != null && message.hasOwnProperty("owner")) {
                    var error = $root.pesto.models.User.verify(message.owner);
                    if (error)
                        return "owner." + error;
                }
                return null;
            };

            /**
             * Creates a Claim message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.Claim
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.Claim} Claim
             */
            Claim.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.Claim)
                    return object;
                var message = new $root.pesto.models.Claim();
                if (object.identifier != null)
                    message.identifier = String(object.identifier);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.owner != null) {
                    if (typeof object.owner !== "object")
                        throw TypeError(".pesto.models.Claim.owner: object expected");
                    message.owner = $root.pesto.models.User.fromObject(object.owner);
                }
                return message;
            };

            /**
             * Creates a plain object from a Claim message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.Claim
             * @static
             * @param {pesto.models.Claim} message Claim
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Claim.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.identifier = "";
                    object.name = "";
                    object.owner = null;
                }
                if (message.identifier != null && message.hasOwnProperty("identifier"))
                    object.identifier = message.identifier;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.owner != null && message.hasOwnProperty("owner"))
                    object.owner = $root.pesto.models.User.toObject(message.owner, options);
                return object;
            };

            /**
             * Converts this Claim to JSON.
             * @function toJSON
             * @memberof pesto.models.Claim
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Claim.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Claim;
        })();

        models.User = (function() {

            /**
             * Properties of a User.
             * @memberof pesto.models
             * @interface IUser
             * @property {number|null} [uid] User uid
             * @property {string|null} [phoneNo] User phoneNo
             * @property {string|null} [pictureUrl] User pictureUrl
             * @property {number|null} [balance] User balance
             * @property {string|null} [username] User username
             */

            /**
             * Constructs a new User.
             * @memberof pesto.models
             * @classdesc Represents a User.
             * @implements IUser
             * @constructor
             * @param {pesto.models.IUser=} [properties] Properties to set
             */
            function User(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * User uid.
             * @member {number} uid
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.uid = 0;

            /**
             * User phoneNo.
             * @member {string} phoneNo
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.phoneNo = "";

            /**
             * User pictureUrl.
             * @member {string} pictureUrl
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.pictureUrl = "";

            /**
             * User balance.
             * @member {number} balance
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.balance = 0;

            /**
             * User username.
             * @member {string} username
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.username = "";

            /**
             * Creates a new User instance using the specified properties.
             * @function create
             * @memberof pesto.models.User
             * @static
             * @param {pesto.models.IUser=} [properties] Properties to set
             * @returns {pesto.models.User} User instance
             */
            User.create = function create(properties) {
                return new User(properties);
            };

            /**
             * Encodes the specified User message. Does not implicitly {@link pesto.models.User.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.User
             * @static
             * @param {pesto.models.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.phoneNo);
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.pictureUrl);
                if (message.balance != null && message.hasOwnProperty("balance"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.balance);
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.username);
                return writer;
            };

            /**
             * Encodes the specified User message, length delimited. Does not implicitly {@link pesto.models.User.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.User
             * @static
             * @param {pesto.models.IUser} message User message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            User.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a User message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.User();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.phoneNo = reader.string();
                        break;
                    case 3:
                        message.pictureUrl = reader.string();
                        break;
                    case 4:
                        message.balance = reader.int32();
                        break;
                    case 5:
                        message.username = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a User message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.User
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.User} User
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            User.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a User message.
             * @function verify
             * @memberof pesto.models.User
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            User.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    if (!$util.isString(message.phoneNo))
                        return "phoneNo: string expected";
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    if (!$util.isString(message.pictureUrl))
                        return "pictureUrl: string expected";
                if (message.balance != null && message.hasOwnProperty("balance"))
                    if (!$util.isInteger(message.balance))
                        return "balance: integer expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                return null;
            };

            /**
             * Creates a User message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.User
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.User} User
             */
            User.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.User)
                    return object;
                var message = new $root.pesto.models.User();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.phoneNo != null)
                    message.phoneNo = String(object.phoneNo);
                if (object.pictureUrl != null)
                    message.pictureUrl = String(object.pictureUrl);
                if (object.balance != null)
                    message.balance = object.balance | 0;
                if (object.username != null)
                    message.username = String(object.username);
                return message;
            };

            /**
             * Creates a plain object from a User message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.User
             * @static
             * @param {pesto.models.User} message User
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            User.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.phoneNo = "";
                    object.pictureUrl = "";
                    object.balance = 0;
                    object.username = "";
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    object.phoneNo = message.phoneNo;
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    object.pictureUrl = message.pictureUrl;
                if (message.balance != null && message.hasOwnProperty("balance"))
                    object.balance = message.balance;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                return object;
            };

            /**
             * Converts this User to JSON.
             * @function toJSON
             * @memberof pesto.models.User
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            User.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return User;
        })();

        models.Room = (function() {

            /**
             * Properties of a Room.
             * @memberof pesto.models
             * @interface IRoom
             * @property {number|null} [uid] Room uid
             * @property {pesto.models.IUser|null} [owner] Room owner
             * @property {string|null} [name] Room name
             * @property {Array.<pesto.models.IRoomItem>|null} [item] Room item
             * @property {Array.<pesto.models.IUser>|null} [invited] Room invited
             */

            /**
             * Constructs a new Room.
             * @memberof pesto.models
             * @classdesc Represents a Room.
             * @implements IRoom
             * @constructor
             * @param {pesto.models.IRoom=} [properties] Properties to set
             */
            function Room(properties) {
                this.item = [];
                this.invited = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Room uid.
             * @member {number} uid
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.uid = 0;

            /**
             * Room owner.
             * @member {pesto.models.IUser|null|undefined} owner
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.owner = null;

            /**
             * Room name.
             * @member {string} name
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.name = "";

            /**
             * Room item.
             * @member {Array.<pesto.models.IRoomItem>} item
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.item = $util.emptyArray;

            /**
             * Room invited.
             * @member {Array.<pesto.models.IUser>} invited
             * @memberof pesto.models.Room
             * @instance
             */
            Room.prototype.invited = $util.emptyArray;

            /**
             * Creates a new Room instance using the specified properties.
             * @function create
             * @memberof pesto.models.Room
             * @static
             * @param {pesto.models.IRoom=} [properties] Properties to set
             * @returns {pesto.models.Room} Room instance
             */
            Room.create = function create(properties) {
                return new Room(properties);
            };

            /**
             * Encodes the specified Room message. Does not implicitly {@link pesto.models.Room.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.Room
             * @static
             * @param {pesto.models.IRoom} message Room message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Room.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.owner != null && message.hasOwnProperty("owner"))
                    $root.pesto.models.User.encode(message.owner, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.item != null && message.item.length)
                    for (var i = 0; i < message.item.length; ++i)
                        $root.pesto.models.RoomItem.encode(message.item[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.invited != null && message.invited.length)
                    for (var i = 0; i < message.invited.length; ++i)
                        $root.pesto.models.User.encode(message.invited[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Room message, length delimited. Does not implicitly {@link pesto.models.Room.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.Room
             * @static
             * @param {pesto.models.IRoom} message Room message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Room.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Room message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.Room
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.Room} Room
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Room.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.Room();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.owner = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.name = reader.string();
                        break;
                    case 4:
                        if (!(message.item && message.item.length))
                            message.item = [];
                        message.item.push($root.pesto.models.RoomItem.decode(reader, reader.uint32()));
                        break;
                    case 5:
                        if (!(message.invited && message.invited.length))
                            message.invited = [];
                        message.invited.push($root.pesto.models.User.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Room message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.Room
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.Room} Room
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Room.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Room message.
             * @function verify
             * @memberof pesto.models.Room
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Room.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.owner != null && message.hasOwnProperty("owner")) {
                    var error = $root.pesto.models.User.verify(message.owner);
                    if (error)
                        return "owner." + error;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.item != null && message.hasOwnProperty("item")) {
                    if (!Array.isArray(message.item))
                        return "item: array expected";
                    for (var i = 0; i < message.item.length; ++i) {
                        var error = $root.pesto.models.RoomItem.verify(message.item[i]);
                        if (error)
                            return "item." + error;
                    }
                }
                if (message.invited != null && message.hasOwnProperty("invited")) {
                    if (!Array.isArray(message.invited))
                        return "invited: array expected";
                    for (var i = 0; i < message.invited.length; ++i) {
                        var error = $root.pesto.models.User.verify(message.invited[i]);
                        if (error)
                            return "invited." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Room message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.Room
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.Room} Room
             */
            Room.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.Room)
                    return object;
                var message = new $root.pesto.models.Room();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.owner != null) {
                    if (typeof object.owner !== "object")
                        throw TypeError(".pesto.models.Room.owner: object expected");
                    message.owner = $root.pesto.models.User.fromObject(object.owner);
                }
                if (object.name != null)
                    message.name = String(object.name);
                if (object.item) {
                    if (!Array.isArray(object.item))
                        throw TypeError(".pesto.models.Room.item: array expected");
                    message.item = [];
                    for (var i = 0; i < object.item.length; ++i) {
                        if (typeof object.item[i] !== "object")
                            throw TypeError(".pesto.models.Room.item: object expected");
                        message.item[i] = $root.pesto.models.RoomItem.fromObject(object.item[i]);
                    }
                }
                if (object.invited) {
                    if (!Array.isArray(object.invited))
                        throw TypeError(".pesto.models.Room.invited: array expected");
                    message.invited = [];
                    for (var i = 0; i < object.invited.length; ++i) {
                        if (typeof object.invited[i] !== "object")
                            throw TypeError(".pesto.models.Room.invited: object expected");
                        message.invited[i] = $root.pesto.models.User.fromObject(object.invited[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Room message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.Room
             * @static
             * @param {pesto.models.Room} message Room
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Room.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.item = [];
                    object.invited = [];
                }
                if (options.defaults) {
                    object.uid = 0;
                    object.owner = null;
                    object.name = "";
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.owner != null && message.hasOwnProperty("owner"))
                    object.owner = $root.pesto.models.User.toObject(message.owner, options);
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.item && message.item.length) {
                    object.item = [];
                    for (var j = 0; j < message.item.length; ++j)
                        object.item[j] = $root.pesto.models.RoomItem.toObject(message.item[j], options);
                }
                if (message.invited && message.invited.length) {
                    object.invited = [];
                    for (var j = 0; j < message.invited.length; ++j)
                        object.invited[j] = $root.pesto.models.User.toObject(message.invited[j], options);
                }
                return object;
            };

            /**
             * Converts this Room to JSON.
             * @function toJSON
             * @memberof pesto.models.Room
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Room.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Room;
        })();

        models.RoomItem = (function() {

            /**
             * Properties of a RoomItem.
             * @memberof pesto.models
             * @interface IRoomItem
             * @property {number|null} [uid] RoomItem uid
             * @property {string|null} [name] RoomItem name
             * @property {number|null} [value] RoomItem value
             * @property {pesto.models.IUser|null} [lockedBy] RoomItem lockedBy
             */

            /**
             * Constructs a new RoomItem.
             * @memberof pesto.models
             * @classdesc Represents a RoomItem.
             * @implements IRoomItem
             * @constructor
             * @param {pesto.models.IRoomItem=} [properties] Properties to set
             */
            function RoomItem(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RoomItem uid.
             * @member {number} uid
             * @memberof pesto.models.RoomItem
             * @instance
             */
            RoomItem.prototype.uid = 0;

            /**
             * RoomItem name.
             * @member {string} name
             * @memberof pesto.models.RoomItem
             * @instance
             */
            RoomItem.prototype.name = "";

            /**
             * RoomItem value.
             * @member {number} value
             * @memberof pesto.models.RoomItem
             * @instance
             */
            RoomItem.prototype.value = 0;

            /**
             * RoomItem lockedBy.
             * @member {pesto.models.IUser|null|undefined} lockedBy
             * @memberof pesto.models.RoomItem
             * @instance
             */
            RoomItem.prototype.lockedBy = null;

            /**
             * Creates a new RoomItem instance using the specified properties.
             * @function create
             * @memberof pesto.models.RoomItem
             * @static
             * @param {pesto.models.IRoomItem=} [properties] Properties to set
             * @returns {pesto.models.RoomItem} RoomItem instance
             */
            RoomItem.create = function create(properties) {
                return new RoomItem(properties);
            };

            /**
             * Encodes the specified RoomItem message. Does not implicitly {@link pesto.models.RoomItem.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.RoomItem
             * @static
             * @param {pesto.models.IRoomItem} message RoomItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RoomItem.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.value);
                if (message.lockedBy != null && message.hasOwnProperty("lockedBy"))
                    $root.pesto.models.User.encode(message.lockedBy, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RoomItem message, length delimited. Does not implicitly {@link pesto.models.RoomItem.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.RoomItem
             * @static
             * @param {pesto.models.IRoomItem} message RoomItem message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RoomItem.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RoomItem message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.RoomItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.RoomItem} RoomItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RoomItem.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.RoomItem();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.value = reader.int32();
                        break;
                    case 4:
                        message.lockedBy = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RoomItem message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.RoomItem
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.RoomItem} RoomItem
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RoomItem.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RoomItem message.
             * @function verify
             * @memberof pesto.models.RoomItem
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RoomItem.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!$util.isInteger(message.value))
                        return "value: integer expected";
                if (message.lockedBy != null && message.hasOwnProperty("lockedBy")) {
                    var error = $root.pesto.models.User.verify(message.lockedBy);
                    if (error)
                        return "lockedBy." + error;
                }
                return null;
            };

            /**
             * Creates a RoomItem message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.RoomItem
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.RoomItem} RoomItem
             */
            RoomItem.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.RoomItem)
                    return object;
                var message = new $root.pesto.models.RoomItem();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.value != null)
                    message.value = object.value | 0;
                if (object.lockedBy != null) {
                    if (typeof object.lockedBy !== "object")
                        throw TypeError(".pesto.models.RoomItem.lockedBy: object expected");
                    message.lockedBy = $root.pesto.models.User.fromObject(object.lockedBy);
                }
                return message;
            };

            /**
             * Creates a plain object from a RoomItem message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.RoomItem
             * @static
             * @param {pesto.models.RoomItem} message RoomItem
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RoomItem.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.name = "";
                    object.value = 0;
                    object.lockedBy = null;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = message.value;
                if (message.lockedBy != null && message.hasOwnProperty("lockedBy"))
                    object.lockedBy = $root.pesto.models.User.toObject(message.lockedBy, options);
                return object;
            };

            /**
             * Converts this RoomItem to JSON.
             * @function toJSON
             * @memberof pesto.models.RoomItem
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RoomItem.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RoomItem;
        })();

        models.Contact = (function() {

            /**
             * Properties of a Contact.
             * @memberof pesto.models
             * @interface IContact
             * @property {number|null} [uid] Contact uid
             * @property {string|null} [username] Contact username
             * @property {boolean|null} [trusted] Contact trusted
             */

            /**
             * Constructs a new Contact.
             * @memberof pesto.models
             * @classdesc Represents a Contact.
             * @implements IContact
             * @constructor
             * @param {pesto.models.IContact=} [properties] Properties to set
             */
            function Contact(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Contact uid.
             * @member {number} uid
             * @memberof pesto.models.Contact
             * @instance
             */
            Contact.prototype.uid = 0;

            /**
             * Contact username.
             * @member {string} username
             * @memberof pesto.models.Contact
             * @instance
             */
            Contact.prototype.username = "";

            /**
             * Contact trusted.
             * @member {boolean} trusted
             * @memberof pesto.models.Contact
             * @instance
             */
            Contact.prototype.trusted = false;

            /**
             * Creates a new Contact instance using the specified properties.
             * @function create
             * @memberof pesto.models.Contact
             * @static
             * @param {pesto.models.IContact=} [properties] Properties to set
             * @returns {pesto.models.Contact} Contact instance
             */
            Contact.create = function create(properties) {
                return new Contact(properties);
            };

            /**
             * Encodes the specified Contact message. Does not implicitly {@link pesto.models.Contact.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.Contact
             * @static
             * @param {pesto.models.IContact} message Contact message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Contact.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.trusted != null && message.hasOwnProperty("trusted"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.trusted);
                return writer;
            };

            /**
             * Encodes the specified Contact message, length delimited. Does not implicitly {@link pesto.models.Contact.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.Contact
             * @static
             * @param {pesto.models.IContact} message Contact message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Contact.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Contact message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.Contact
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.Contact} Contact
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Contact.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.Contact();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.username = reader.string();
                        break;
                    case 3:
                        message.trusted = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Contact message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.Contact
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.Contact} Contact
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Contact.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Contact message.
             * @function verify
             * @memberof pesto.models.Contact
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Contact.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.trusted != null && message.hasOwnProperty("trusted"))
                    if (typeof message.trusted !== "boolean")
                        return "trusted: boolean expected";
                return null;
            };

            /**
             * Creates a Contact message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.Contact
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.Contact} Contact
             */
            Contact.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.Contact)
                    return object;
                var message = new $root.pesto.models.Contact();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.username != null)
                    message.username = String(object.username);
                if (object.trusted != null)
                    message.trusted = Boolean(object.trusted);
                return message;
            };

            /**
             * Creates a plain object from a Contact message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.Contact
             * @static
             * @param {pesto.models.Contact} message Contact
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Contact.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.username = "";
                    object.trusted = false;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.trusted != null && message.hasOwnProperty("trusted"))
                    object.trusted = message.trusted;
                return object;
            };

            /**
             * Converts this Contact to JSON.
             * @function toJSON
             * @memberof pesto.models.Contact
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Contact.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Contact;
        })();

        return models;
    })();

    pesto.user_messages = (function() {

        /**
         * Namespace user_messages.
         * @memberof pesto
         * @namespace
         */
        var user_messages = {};

        user_messages.RegisterRequest = (function() {

            /**
             * Properties of a RegisterRequest.
             * @memberof pesto.user_messages
             * @interface IRegisterRequest
             * @property {string|null} [phoneNo] RegisterRequest phoneNo
             * @property {string|null} [username] RegisterRequest username
             * @property {string|null} [password] RegisterRequest password
             */

            /**
             * Constructs a new RegisterRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a RegisterRequest.
             * @implements IRegisterRequest
             * @constructor
             * @param {pesto.user_messages.IRegisterRequest=} [properties] Properties to set
             */
            function RegisterRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RegisterRequest phoneNo.
             * @member {string} phoneNo
             * @memberof pesto.user_messages.RegisterRequest
             * @instance
             */
            RegisterRequest.prototype.phoneNo = "";

            /**
             * RegisterRequest username.
             * @member {string} username
             * @memberof pesto.user_messages.RegisterRequest
             * @instance
             */
            RegisterRequest.prototype.username = "";

            /**
             * RegisterRequest password.
             * @member {string} password
             * @memberof pesto.user_messages.RegisterRequest
             * @instance
             */
            RegisterRequest.prototype.password = "";

            /**
             * Creates a new RegisterRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {pesto.user_messages.IRegisterRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.RegisterRequest} RegisterRequest instance
             */
            RegisterRequest.create = function create(properties) {
                return new RegisterRequest(properties);
            };

            /**
             * Encodes the specified RegisterRequest message. Does not implicitly {@link pesto.user_messages.RegisterRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {pesto.user_messages.IRegisterRequest} message RegisterRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.phoneNo);
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.password != null && message.hasOwnProperty("password"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.password);
                return writer;
            };

            /**
             * Encodes the specified RegisterRequest message, length delimited. Does not implicitly {@link pesto.user_messages.RegisterRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {pesto.user_messages.IRegisterRequest} message RegisterRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RegisterRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.RegisterRequest} RegisterRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.RegisterRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.phoneNo = reader.string();
                        break;
                    case 2:
                        message.username = reader.string();
                        break;
                    case 3:
                        message.password = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RegisterRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.RegisterRequest} RegisterRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RegisterRequest message.
             * @function verify
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RegisterRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    if (!$util.isString(message.phoneNo))
                        return "phoneNo: string expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.password != null && message.hasOwnProperty("password"))
                    if (!$util.isString(message.password))
                        return "password: string expected";
                return null;
            };

            /**
             * Creates a RegisterRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.RegisterRequest} RegisterRequest
             */
            RegisterRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.RegisterRequest)
                    return object;
                var message = new $root.pesto.user_messages.RegisterRequest();
                if (object.phoneNo != null)
                    message.phoneNo = String(object.phoneNo);
                if (object.username != null)
                    message.username = String(object.username);
                if (object.password != null)
                    message.password = String(object.password);
                return message;
            };

            /**
             * Creates a plain object from a RegisterRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.RegisterRequest
             * @static
             * @param {pesto.user_messages.RegisterRequest} message RegisterRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RegisterRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.phoneNo = "";
                    object.username = "";
                    object.password = "";
                }
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    object.phoneNo = message.phoneNo;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                return object;
            };

            /**
             * Converts this RegisterRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.RegisterRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RegisterRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RegisterRequest;
        })();

        user_messages.RegisterResponse = (function() {

            /**
             * Properties of a RegisterResponse.
             * @memberof pesto.user_messages
             * @interface IRegisterResponse
             * @property {pesto.models.IUser|null} [user] RegisterResponse user
             * @property {boolean|null} [successful] RegisterResponse successful
             */

            /**
             * Constructs a new RegisterResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a RegisterResponse.
             * @implements IRegisterResponse
             * @constructor
             * @param {pesto.user_messages.IRegisterResponse=} [properties] Properties to set
             */
            function RegisterResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RegisterResponse user.
             * @member {pesto.models.IUser|null|undefined} user
             * @memberof pesto.user_messages.RegisterResponse
             * @instance
             */
            RegisterResponse.prototype.user = null;

            /**
             * RegisterResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.RegisterResponse
             * @instance
             */
            RegisterResponse.prototype.successful = false;

            /**
             * Creates a new RegisterResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {pesto.user_messages.IRegisterResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.RegisterResponse} RegisterResponse instance
             */
            RegisterResponse.create = function create(properties) {
                return new RegisterResponse(properties);
            };

            /**
             * Encodes the specified RegisterResponse message. Does not implicitly {@link pesto.user_messages.RegisterResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {pesto.user_messages.IRegisterResponse} message RegisterResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && message.hasOwnProperty("user"))
                    $root.pesto.models.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified RegisterResponse message, length delimited. Does not implicitly {@link pesto.user_messages.RegisterResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {pesto.user_messages.IRegisterResponse} message RegisterResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RegisterResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.RegisterResponse} RegisterResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.RegisterResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.user = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RegisterResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.RegisterResponse} RegisterResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RegisterResponse message.
             * @function verify
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RegisterResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.pesto.models.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a RegisterResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.RegisterResponse} RegisterResponse
             */
            RegisterResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.RegisterResponse)
                    return object;
                var message = new $root.pesto.user_messages.RegisterResponse();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".pesto.user_messages.RegisterResponse.user: object expected");
                    message.user = $root.pesto.models.User.fromObject(object.user);
                }
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a RegisterResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.RegisterResponse
             * @static
             * @param {pesto.user_messages.RegisterResponse} message RegisterResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RegisterResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.successful = false;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.pesto.models.User.toObject(message.user, options);
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this RegisterResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.RegisterResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RegisterResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RegisterResponse;
        })();

        user_messages.LoginRequest = (function() {

            /**
             * Properties of a LoginRequest.
             * @memberof pesto.user_messages
             * @interface ILoginRequest
             * @property {string|null} [username] LoginRequest username
             * @property {string|null} [password] LoginRequest password
             */

            /**
             * Constructs a new LoginRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a LoginRequest.
             * @implements ILoginRequest
             * @constructor
             * @param {pesto.user_messages.ILoginRequest=} [properties] Properties to set
             */
            function LoginRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginRequest username.
             * @member {string} username
             * @memberof pesto.user_messages.LoginRequest
             * @instance
             */
            LoginRequest.prototype.username = "";

            /**
             * LoginRequest password.
             * @member {string} password
             * @memberof pesto.user_messages.LoginRequest
             * @instance
             */
            LoginRequest.prototype.password = "";

            /**
             * Creates a new LoginRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {pesto.user_messages.ILoginRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.LoginRequest} LoginRequest instance
             */
            LoginRequest.create = function create(properties) {
                return new LoginRequest(properties);
            };

            /**
             * Encodes the specified LoginRequest message. Does not implicitly {@link pesto.user_messages.LoginRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {pesto.user_messages.ILoginRequest} message LoginRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
                if (message.password != null && message.hasOwnProperty("password"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
                return writer;
            };

            /**
             * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link pesto.user_messages.LoginRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {pesto.user_messages.ILoginRequest} message LoginRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LoginRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.LoginRequest} LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.LoginRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.username = reader.string();
                        break;
                    case 2:
                        message.password = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.LoginRequest} LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoginRequest message.
             * @function verify
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.password != null && message.hasOwnProperty("password"))
                    if (!$util.isString(message.password))
                        return "password: string expected";
                return null;
            };

            /**
             * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.LoginRequest} LoginRequest
             */
            LoginRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.LoginRequest)
                    return object;
                var message = new $root.pesto.user_messages.LoginRequest();
                if (object.username != null)
                    message.username = String(object.username);
                if (object.password != null)
                    message.password = String(object.password);
                return message;
            };

            /**
             * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.LoginRequest
             * @static
             * @param {pesto.user_messages.LoginRequest} message LoginRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.username = "";
                    object.password = "";
                }
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.password != null && message.hasOwnProperty("password"))
                    object.password = message.password;
                return object;
            };

            /**
             * Converts this LoginRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.LoginRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginRequest;
        })();

        user_messages.LoginResponse = (function() {

            /**
             * Properties of a LoginResponse.
             * @memberof pesto.user_messages
             * @interface ILoginResponse
             * @property {pesto.models.IUser|null} [user] LoginResponse user
             * @property {boolean|null} [successful] LoginResponse successful
             */

            /**
             * Constructs a new LoginResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a LoginResponse.
             * @implements ILoginResponse
             * @constructor
             * @param {pesto.user_messages.ILoginResponse=} [properties] Properties to set
             */
            function LoginResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginResponse user.
             * @member {pesto.models.IUser|null|undefined} user
             * @memberof pesto.user_messages.LoginResponse
             * @instance
             */
            LoginResponse.prototype.user = null;

            /**
             * LoginResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.LoginResponse
             * @instance
             */
            LoginResponse.prototype.successful = false;

            /**
             * Creates a new LoginResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {pesto.user_messages.ILoginResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.LoginResponse} LoginResponse instance
             */
            LoginResponse.create = function create(properties) {
                return new LoginResponse(properties);
            };

            /**
             * Encodes the specified LoginResponse message. Does not implicitly {@link pesto.user_messages.LoginResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {pesto.user_messages.ILoginResponse} message LoginResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && message.hasOwnProperty("user"))
                    $root.pesto.models.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link pesto.user_messages.LoginResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {pesto.user_messages.ILoginResponse} message LoginResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LoginResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.LoginResponse} LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.LoginResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.user = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.LoginResponse} LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LoginResponse message.
             * @function verify
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.pesto.models.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.LoginResponse} LoginResponse
             */
            LoginResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.LoginResponse)
                    return object;
                var message = new $root.pesto.user_messages.LoginResponse();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".pesto.user_messages.LoginResponse.user: object expected");
                    message.user = $root.pesto.models.User.fromObject(object.user);
                }
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.LoginResponse
             * @static
             * @param {pesto.user_messages.LoginResponse} message LoginResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.successful = false;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.pesto.models.User.toObject(message.user, options);
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this LoginResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.LoginResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginResponse;
        })();

        user_messages.TopupRequest = (function() {

            /**
             * Properties of a TopupRequest.
             * @memberof pesto.user_messages
             * @interface ITopupRequest
             * @property {number|null} [uid] TopupRequest uid
             * @property {number|null} [amount] TopupRequest amount
             */

            /**
             * Constructs a new TopupRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a TopupRequest.
             * @implements ITopupRequest
             * @constructor
             * @param {pesto.user_messages.ITopupRequest=} [properties] Properties to set
             */
            function TopupRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TopupRequest uid.
             * @member {number} uid
             * @memberof pesto.user_messages.TopupRequest
             * @instance
             */
            TopupRequest.prototype.uid = 0;

            /**
             * TopupRequest amount.
             * @member {number} amount
             * @memberof pesto.user_messages.TopupRequest
             * @instance
             */
            TopupRequest.prototype.amount = 0;

            /**
             * Creates a new TopupRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {pesto.user_messages.ITopupRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.TopupRequest} TopupRequest instance
             */
            TopupRequest.create = function create(properties) {
                return new TopupRequest(properties);
            };

            /**
             * Encodes the specified TopupRequest message. Does not implicitly {@link pesto.user_messages.TopupRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {pesto.user_messages.ITopupRequest} message TopupRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TopupRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.amount != null && message.hasOwnProperty("amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.amount);
                return writer;
            };

            /**
             * Encodes the specified TopupRequest message, length delimited. Does not implicitly {@link pesto.user_messages.TopupRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {pesto.user_messages.ITopupRequest} message TopupRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TopupRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TopupRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.TopupRequest} TopupRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TopupRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.TopupRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.amount = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TopupRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.TopupRequest} TopupRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TopupRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TopupRequest message.
             * @function verify
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TopupRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount))
                        return "amount: integer expected";
                return null;
            };

            /**
             * Creates a TopupRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.TopupRequest} TopupRequest
             */
            TopupRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.TopupRequest)
                    return object;
                var message = new $root.pesto.user_messages.TopupRequest();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.amount != null)
                    message.amount = object.amount | 0;
                return message;
            };

            /**
             * Creates a plain object from a TopupRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.TopupRequest
             * @static
             * @param {pesto.user_messages.TopupRequest} message TopupRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TopupRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.amount = 0;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    object.amount = message.amount;
                return object;
            };

            /**
             * Converts this TopupRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.TopupRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TopupRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TopupRequest;
        })();

        user_messages.TopupResponse = (function() {

            /**
             * Properties of a TopupResponse.
             * @memberof pesto.user_messages
             * @interface ITopupResponse
             * @property {pesto.models.IUser|null} [user] TopupResponse user
             * @property {boolean|null} [successful] TopupResponse successful
             */

            /**
             * Constructs a new TopupResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a TopupResponse.
             * @implements ITopupResponse
             * @constructor
             * @param {pesto.user_messages.ITopupResponse=} [properties] Properties to set
             */
            function TopupResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TopupResponse user.
             * @member {pesto.models.IUser|null|undefined} user
             * @memberof pesto.user_messages.TopupResponse
             * @instance
             */
            TopupResponse.prototype.user = null;

            /**
             * TopupResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.TopupResponse
             * @instance
             */
            TopupResponse.prototype.successful = false;

            /**
             * Creates a new TopupResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {pesto.user_messages.ITopupResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.TopupResponse} TopupResponse instance
             */
            TopupResponse.create = function create(properties) {
                return new TopupResponse(properties);
            };

            /**
             * Encodes the specified TopupResponse message. Does not implicitly {@link pesto.user_messages.TopupResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {pesto.user_messages.ITopupResponse} message TopupResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TopupResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && message.hasOwnProperty("user"))
                    $root.pesto.models.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified TopupResponse message, length delimited. Does not implicitly {@link pesto.user_messages.TopupResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {pesto.user_messages.ITopupResponse} message TopupResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TopupResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TopupResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.TopupResponse} TopupResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TopupResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.TopupResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.user = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TopupResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.TopupResponse} TopupResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TopupResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TopupResponse message.
             * @function verify
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TopupResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.pesto.models.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a TopupResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.TopupResponse} TopupResponse
             */
            TopupResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.TopupResponse)
                    return object;
                var message = new $root.pesto.user_messages.TopupResponse();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".pesto.user_messages.TopupResponse.user: object expected");
                    message.user = $root.pesto.models.User.fromObject(object.user);
                }
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a TopupResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.TopupResponse
             * @static
             * @param {pesto.user_messages.TopupResponse} message TopupResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TopupResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.successful = false;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.pesto.models.User.toObject(message.user, options);
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this TopupResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.TopupResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TopupResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TopupResponse;
        })();

        user_messages.TransactionRequest = (function() {

            /**
             * Properties of a TransactionRequest.
             * @memberof pesto.user_messages
             * @interface ITransactionRequest
             * @property {number|null} [payerId] TransactionRequest payerId
             * @property {number|null} [payeeId] TransactionRequest payeeId
             * @property {number|null} [amount] TransactionRequest amount
             */

            /**
             * Constructs a new TransactionRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a TransactionRequest.
             * @implements ITransactionRequest
             * @constructor
             * @param {pesto.user_messages.ITransactionRequest=} [properties] Properties to set
             */
            function TransactionRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TransactionRequest payerId.
             * @member {number} payerId
             * @memberof pesto.user_messages.TransactionRequest
             * @instance
             */
            TransactionRequest.prototype.payerId = 0;

            /**
             * TransactionRequest payeeId.
             * @member {number} payeeId
             * @memberof pesto.user_messages.TransactionRequest
             * @instance
             */
            TransactionRequest.prototype.payeeId = 0;

            /**
             * TransactionRequest amount.
             * @member {number} amount
             * @memberof pesto.user_messages.TransactionRequest
             * @instance
             */
            TransactionRequest.prototype.amount = 0;

            /**
             * Creates a new TransactionRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {pesto.user_messages.ITransactionRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.TransactionRequest} TransactionRequest instance
             */
            TransactionRequest.create = function create(properties) {
                return new TransactionRequest(properties);
            };

            /**
             * Encodes the specified TransactionRequest message. Does not implicitly {@link pesto.user_messages.TransactionRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {pesto.user_messages.ITransactionRequest} message TransactionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.payerId != null && message.hasOwnProperty("payerId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.payerId);
                if (message.payeeId != null && message.hasOwnProperty("payeeId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.payeeId);
                if (message.amount != null && message.hasOwnProperty("amount"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.amount);
                return writer;
            };

            /**
             * Encodes the specified TransactionRequest message, length delimited. Does not implicitly {@link pesto.user_messages.TransactionRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {pesto.user_messages.ITransactionRequest} message TransactionRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TransactionRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.TransactionRequest} TransactionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.TransactionRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.payerId = reader.int32();
                        break;
                    case 2:
                        message.payeeId = reader.int32();
                        break;
                    case 3:
                        message.amount = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TransactionRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.TransactionRequest} TransactionRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TransactionRequest message.
             * @function verify
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TransactionRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.payerId != null && message.hasOwnProperty("payerId"))
                    if (!$util.isInteger(message.payerId))
                        return "payerId: integer expected";
                if (message.payeeId != null && message.hasOwnProperty("payeeId"))
                    if (!$util.isInteger(message.payeeId))
                        return "payeeId: integer expected";
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount))
                        return "amount: integer expected";
                return null;
            };

            /**
             * Creates a TransactionRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.TransactionRequest} TransactionRequest
             */
            TransactionRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.TransactionRequest)
                    return object;
                var message = new $root.pesto.user_messages.TransactionRequest();
                if (object.payerId != null)
                    message.payerId = object.payerId | 0;
                if (object.payeeId != null)
                    message.payeeId = object.payeeId | 0;
                if (object.amount != null)
                    message.amount = object.amount | 0;
                return message;
            };

            /**
             * Creates a plain object from a TransactionRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.TransactionRequest
             * @static
             * @param {pesto.user_messages.TransactionRequest} message TransactionRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TransactionRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.payerId = 0;
                    object.payeeId = 0;
                    object.amount = 0;
                }
                if (message.payerId != null && message.hasOwnProperty("payerId"))
                    object.payerId = message.payerId;
                if (message.payeeId != null && message.hasOwnProperty("payeeId"))
                    object.payeeId = message.payeeId;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    object.amount = message.amount;
                return object;
            };

            /**
             * Converts this TransactionRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.TransactionRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TransactionRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TransactionRequest;
        })();

        user_messages.TransactionResponse = (function() {

            /**
             * Properties of a TransactionResponse.
             * @memberof pesto.user_messages
             * @interface ITransactionResponse
             * @property {pesto.models.IUser|null} [user] TransactionResponse user
             * @property {number|null} [transactionId] TransactionResponse transactionId
             * @property {boolean|null} [successful] TransactionResponse successful
             */

            /**
             * Constructs a new TransactionResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a TransactionResponse.
             * @implements ITransactionResponse
             * @constructor
             * @param {pesto.user_messages.ITransactionResponse=} [properties] Properties to set
             */
            function TransactionResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TransactionResponse user.
             * @member {pesto.models.IUser|null|undefined} user
             * @memberof pesto.user_messages.TransactionResponse
             * @instance
             */
            TransactionResponse.prototype.user = null;

            /**
             * TransactionResponse transactionId.
             * @member {number} transactionId
             * @memberof pesto.user_messages.TransactionResponse
             * @instance
             */
            TransactionResponse.prototype.transactionId = 0;

            /**
             * TransactionResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.TransactionResponse
             * @instance
             */
            TransactionResponse.prototype.successful = false;

            /**
             * Creates a new TransactionResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {pesto.user_messages.ITransactionResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.TransactionResponse} TransactionResponse instance
             */
            TransactionResponse.create = function create(properties) {
                return new TransactionResponse(properties);
            };

            /**
             * Encodes the specified TransactionResponse message. Does not implicitly {@link pesto.user_messages.TransactionResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {pesto.user_messages.ITransactionResponse} message TransactionResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.user != null && message.hasOwnProperty("user"))
                    $root.pesto.models.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.transactionId != null && message.hasOwnProperty("transactionId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.transactionId);
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified TransactionResponse message, length delimited. Does not implicitly {@link pesto.user_messages.TransactionResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {pesto.user_messages.ITransactionResponse} message TransactionResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransactionResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TransactionResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.TransactionResponse} TransactionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.TransactionResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.user = $root.pesto.models.User.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.transactionId = reader.int32();
                        break;
                    case 3:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TransactionResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.TransactionResponse} TransactionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransactionResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TransactionResponse message.
             * @function verify
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TransactionResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.user != null && message.hasOwnProperty("user")) {
                    var error = $root.pesto.models.User.verify(message.user);
                    if (error)
                        return "user." + error;
                }
                if (message.transactionId != null && message.hasOwnProperty("transactionId"))
                    if (!$util.isInteger(message.transactionId))
                        return "transactionId: integer expected";
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a TransactionResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.TransactionResponse} TransactionResponse
             */
            TransactionResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.TransactionResponse)
                    return object;
                var message = new $root.pesto.user_messages.TransactionResponse();
                if (object.user != null) {
                    if (typeof object.user !== "object")
                        throw TypeError(".pesto.user_messages.TransactionResponse.user: object expected");
                    message.user = $root.pesto.models.User.fromObject(object.user);
                }
                if (object.transactionId != null)
                    message.transactionId = object.transactionId | 0;
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a TransactionResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.TransactionResponse
             * @static
             * @param {pesto.user_messages.TransactionResponse} message TransactionResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TransactionResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.user = null;
                    object.transactionId = 0;
                    object.successful = false;
                }
                if (message.user != null && message.hasOwnProperty("user"))
                    object.user = $root.pesto.models.User.toObject(message.user, options);
                if (message.transactionId != null && message.hasOwnProperty("transactionId"))
                    object.transactionId = message.transactionId;
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this TransactionResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.TransactionResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TransactionResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TransactionResponse;
        })();

        user_messages.AddContactRequest = (function() {

            /**
             * Properties of an AddContactRequest.
             * @memberof pesto.user_messages
             * @interface IAddContactRequest
             * @property {number|null} [userId] AddContactRequest userId
             * @property {string|null} [contactUsername] AddContactRequest contactUsername
             */

            /**
             * Constructs a new AddContactRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents an AddContactRequest.
             * @implements IAddContactRequest
             * @constructor
             * @param {pesto.user_messages.IAddContactRequest=} [properties] Properties to set
             */
            function AddContactRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AddContactRequest userId.
             * @member {number} userId
             * @memberof pesto.user_messages.AddContactRequest
             * @instance
             */
            AddContactRequest.prototype.userId = 0;

            /**
             * AddContactRequest contactUsername.
             * @member {string} contactUsername
             * @memberof pesto.user_messages.AddContactRequest
             * @instance
             */
            AddContactRequest.prototype.contactUsername = "";

            /**
             * Creates a new AddContactRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {pesto.user_messages.IAddContactRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.AddContactRequest} AddContactRequest instance
             */
            AddContactRequest.create = function create(properties) {
                return new AddContactRequest(properties);
            };

            /**
             * Encodes the specified AddContactRequest message. Does not implicitly {@link pesto.user_messages.AddContactRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {pesto.user_messages.IAddContactRequest} message AddContactRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddContactRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && message.hasOwnProperty("userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
                if (message.contactUsername != null && message.hasOwnProperty("contactUsername"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.contactUsername);
                return writer;
            };

            /**
             * Encodes the specified AddContactRequest message, length delimited. Does not implicitly {@link pesto.user_messages.AddContactRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {pesto.user_messages.IAddContactRequest} message AddContactRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddContactRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AddContactRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.AddContactRequest} AddContactRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddContactRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.AddContactRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.userId = reader.int32();
                        break;
                    case 2:
                        message.contactUsername = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AddContactRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.AddContactRequest} AddContactRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddContactRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AddContactRequest message.
             * @function verify
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AddContactRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                if (message.contactUsername != null && message.hasOwnProperty("contactUsername"))
                    if (!$util.isString(message.contactUsername))
                        return "contactUsername: string expected";
                return null;
            };

            /**
             * Creates an AddContactRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.AddContactRequest} AddContactRequest
             */
            AddContactRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.AddContactRequest)
                    return object;
                var message = new $root.pesto.user_messages.AddContactRequest();
                if (object.userId != null)
                    message.userId = object.userId | 0;
                if (object.contactUsername != null)
                    message.contactUsername = String(object.contactUsername);
                return message;
            };

            /**
             * Creates a plain object from an AddContactRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.AddContactRequest
             * @static
             * @param {pesto.user_messages.AddContactRequest} message AddContactRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AddContactRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.userId = 0;
                    object.contactUsername = "";
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.contactUsername != null && message.hasOwnProperty("contactUsername"))
                    object.contactUsername = message.contactUsername;
                return object;
            };

            /**
             * Converts this AddContactRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.AddContactRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AddContactRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AddContactRequest;
        })();

        user_messages.AddContactResponse = (function() {

            /**
             * Properties of an AddContactResponse.
             * @memberof pesto.user_messages
             * @interface IAddContactResponse
             * @property {boolean|null} [successful] AddContactResponse successful
             */

            /**
             * Constructs a new AddContactResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents an AddContactResponse.
             * @implements IAddContactResponse
             * @constructor
             * @param {pesto.user_messages.IAddContactResponse=} [properties] Properties to set
             */
            function AddContactResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AddContactResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.AddContactResponse
             * @instance
             */
            AddContactResponse.prototype.successful = false;

            /**
             * Creates a new AddContactResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {pesto.user_messages.IAddContactResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.AddContactResponse} AddContactResponse instance
             */
            AddContactResponse.create = function create(properties) {
                return new AddContactResponse(properties);
            };

            /**
             * Encodes the specified AddContactResponse message. Does not implicitly {@link pesto.user_messages.AddContactResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {pesto.user_messages.IAddContactResponse} message AddContactResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddContactResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified AddContactResponse message, length delimited. Does not implicitly {@link pesto.user_messages.AddContactResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {pesto.user_messages.IAddContactResponse} message AddContactResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AddContactResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AddContactResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.AddContactResponse} AddContactResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddContactResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.AddContactResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.successful = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AddContactResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.AddContactResponse} AddContactResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AddContactResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AddContactResponse message.
             * @function verify
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AddContactResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates an AddContactResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.AddContactResponse} AddContactResponse
             */
            AddContactResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.AddContactResponse)
                    return object;
                var message = new $root.pesto.user_messages.AddContactResponse();
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from an AddContactResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.AddContactResponse
             * @static
             * @param {pesto.user_messages.AddContactResponse} message AddContactResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AddContactResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.successful = false;
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                return object;
            };

            /**
             * Converts this AddContactResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.AddContactResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AddContactResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AddContactResponse;
        })();

        user_messages.GetContactsResponse = (function() {

            /**
             * Properties of a GetContactsResponse.
             * @memberof pesto.user_messages
             * @interface IGetContactsResponse
             * @property {Array.<pesto.models.IContact>|null} [contacts] GetContactsResponse contacts
             */

            /**
             * Constructs a new GetContactsResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a GetContactsResponse.
             * @implements IGetContactsResponse
             * @constructor
             * @param {pesto.user_messages.IGetContactsResponse=} [properties] Properties to set
             */
            function GetContactsResponse(properties) {
                this.contacts = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetContactsResponse contacts.
             * @member {Array.<pesto.models.IContact>} contacts
             * @memberof pesto.user_messages.GetContactsResponse
             * @instance
             */
            GetContactsResponse.prototype.contacts = $util.emptyArray;

            /**
             * Creates a new GetContactsResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {pesto.user_messages.IGetContactsResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.GetContactsResponse} GetContactsResponse instance
             */
            GetContactsResponse.create = function create(properties) {
                return new GetContactsResponse(properties);
            };

            /**
             * Encodes the specified GetContactsResponse message. Does not implicitly {@link pesto.user_messages.GetContactsResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {pesto.user_messages.IGetContactsResponse} message GetContactsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetContactsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.contacts != null && message.contacts.length)
                    for (var i = 0; i < message.contacts.length; ++i)
                        $root.pesto.models.Contact.encode(message.contacts[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GetContactsResponse message, length delimited. Does not implicitly {@link pesto.user_messages.GetContactsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {pesto.user_messages.IGetContactsResponse} message GetContactsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetContactsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetContactsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.GetContactsResponse} GetContactsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetContactsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.GetContactsResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.contacts && message.contacts.length))
                            message.contacts = [];
                        message.contacts.push($root.pesto.models.Contact.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetContactsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.GetContactsResponse} GetContactsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetContactsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetContactsResponse message.
             * @function verify
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetContactsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.contacts != null && message.hasOwnProperty("contacts")) {
                    if (!Array.isArray(message.contacts))
                        return "contacts: array expected";
                    for (var i = 0; i < message.contacts.length; ++i) {
                        var error = $root.pesto.models.Contact.verify(message.contacts[i]);
                        if (error)
                            return "contacts." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GetContactsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.GetContactsResponse} GetContactsResponse
             */
            GetContactsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.GetContactsResponse)
                    return object;
                var message = new $root.pesto.user_messages.GetContactsResponse();
                if (object.contacts) {
                    if (!Array.isArray(object.contacts))
                        throw TypeError(".pesto.user_messages.GetContactsResponse.contacts: array expected");
                    message.contacts = [];
                    for (var i = 0; i < object.contacts.length; ++i) {
                        if (typeof object.contacts[i] !== "object")
                            throw TypeError(".pesto.user_messages.GetContactsResponse.contacts: object expected");
                        message.contacts[i] = $root.pesto.models.Contact.fromObject(object.contacts[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetContactsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.GetContactsResponse
             * @static
             * @param {pesto.user_messages.GetContactsResponse} message GetContactsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetContactsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.contacts = [];
                if (message.contacts && message.contacts.length) {
                    object.contacts = [];
                    for (var j = 0; j < message.contacts.length; ++j)
                        object.contacts[j] = $root.pesto.models.Contact.toObject(message.contacts[j], options);
                }
                return object;
            };

            /**
             * Converts this GetContactsResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.GetContactsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetContactsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetContactsResponse;
        })();

        return user_messages;
    })();

    return pesto;
})();

module.exports = $root;
