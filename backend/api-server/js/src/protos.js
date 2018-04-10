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

        models.User = (function() {

            /**
             * Properties of a User.
             * @memberof pesto.models
             * @interface IUser
             * @property {number|null} [uid] User uid
             * @property {string|null} [username] User username
             * @property {string|null} [phoneNo] User phoneNo
             * @property {string|null} [pictureUrl] User pictureUrl
             * @property {number|null} [balance] User balance
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
             * User username.
             * @member {string} username
             * @memberof pesto.models.User
             * @instance
             */
            User.prototype.username = "";

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
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.phoneNo);
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.pictureUrl);
                if (message.balance != null && message.hasOwnProperty("balance"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.balance);
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
                        message.username = reader.string();
                        break;
                    case 3:
                        message.phoneNo = reader.string();
                        break;
                    case 4:
                        message.pictureUrl = reader.string();
                        break;
                    case 5:
                        message.balance = reader.int32();
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
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    if (!$util.isString(message.phoneNo))
                        return "phoneNo: string expected";
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    if (!$util.isString(message.pictureUrl))
                        return "pictureUrl: string expected";
                if (message.balance != null && message.hasOwnProperty("balance"))
                    if (!$util.isInteger(message.balance))
                        return "balance: integer expected";
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
                if (object.username != null)
                    message.username = String(object.username);
                if (object.phoneNo != null)
                    message.phoneNo = String(object.phoneNo);
                if (object.pictureUrl != null)
                    message.pictureUrl = String(object.pictureUrl);
                if (object.balance != null)
                    message.balance = object.balance | 0;
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
                    object.username = "";
                    object.phoneNo = "";
                    object.pictureUrl = "";
                    object.balance = 0;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                if (message.phoneNo != null && message.hasOwnProperty("phoneNo"))
                    object.phoneNo = message.phoneNo;
                if (message.pictureUrl != null && message.hasOwnProperty("pictureUrl"))
                    object.pictureUrl = message.pictureUrl;
                if (message.balance != null && message.hasOwnProperty("balance"))
                    object.balance = message.balance;
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

        models.Claim = (function() {

            /**
             * Properties of a Claim.
             * @memberof pesto.models
             * @interface IClaim
             * @property {number|null} [uid] Claim uid
             * @property {number|null} [amount] Claim amount
             * @property {pesto.models.IProfile|null} [owner] Claim owner
             * @property {pesto.models.IProfile|null} [receiver] Claim receiver
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
             * Claim uid.
             * @member {number} uid
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.uid = 0;

            /**
             * Claim amount.
             * @member {number} amount
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.amount = 0;

            /**
             * Claim owner.
             * @member {pesto.models.IProfile|null|undefined} owner
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.owner = null;

            /**
             * Claim receiver.
             * @member {pesto.models.IProfile|null|undefined} receiver
             * @memberof pesto.models.Claim
             * @instance
             */
            Claim.prototype.receiver = null;

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
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.amount != null && message.hasOwnProperty("amount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.amount);
                if (message.owner != null && message.hasOwnProperty("owner"))
                    $root.pesto.models.Profile.encode(message.owner, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.receiver != null && message.hasOwnProperty("receiver"))
                    $root.pesto.models.Profile.encode(message.receiver, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
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
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.amount = reader.int32();
                        break;
                    case 3:
                        message.owner = $root.pesto.models.Profile.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.receiver = $root.pesto.models.Profile.decode(reader, reader.uint32());
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
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount))
                        return "amount: integer expected";
                if (message.owner != null && message.hasOwnProperty("owner")) {
                    var error = $root.pesto.models.Profile.verify(message.owner);
                    if (error)
                        return "owner." + error;
                }
                if (message.receiver != null && message.hasOwnProperty("receiver")) {
                    var error = $root.pesto.models.Profile.verify(message.receiver);
                    if (error)
                        return "receiver." + error;
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
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.amount != null)
                    message.amount = object.amount | 0;
                if (object.owner != null) {
                    if (typeof object.owner !== "object")
                        throw TypeError(".pesto.models.Claim.owner: object expected");
                    message.owner = $root.pesto.models.Profile.fromObject(object.owner);
                }
                if (object.receiver != null) {
                    if (typeof object.receiver !== "object")
                        throw TypeError(".pesto.models.Claim.receiver: object expected");
                    message.receiver = $root.pesto.models.Profile.fromObject(object.receiver);
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
                    object.uid = 0;
                    object.amount = 0;
                    object.owner = null;
                    object.receiver = null;
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.amount != null && message.hasOwnProperty("amount"))
                    object.amount = message.amount;
                if (message.owner != null && message.hasOwnProperty("owner"))
                    object.owner = $root.pesto.models.Profile.toObject(message.owner, options);
                if (message.receiver != null && message.hasOwnProperty("receiver"))
                    object.receiver = $root.pesto.models.Profile.toObject(message.receiver, options);
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

        models.Room = (function() {

            /**
             * Properties of a Room.
             * @memberof pesto.models
             * @interface IRoom
             * @property {number|null} [uid] Room uid
             * @property {pesto.models.IProfile|null} [owner] Room owner
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
             * @member {pesto.models.IProfile|null|undefined} owner
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
                    $root.pesto.models.Profile.encode(message.owner, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                        message.owner = $root.pesto.models.Profile.decode(reader, reader.uint32());
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
                    var error = $root.pesto.models.Profile.verify(message.owner);
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
                    message.owner = $root.pesto.models.Profile.fromObject(object.owner);
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
                    object.owner = $root.pesto.models.Profile.toObject(message.owner, options);
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
             * @property {pesto.models.IProfile|null} [profile] Contact profile
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
             * Contact profile.
             * @member {pesto.models.IProfile|null|undefined} profile
             * @memberof pesto.models.Contact
             * @instance
             */
            Contact.prototype.profile = null;

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
                if (message.profile != null && message.hasOwnProperty("profile"))
                    $root.pesto.models.Profile.encode(message.profile, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.trusted != null && message.hasOwnProperty("trusted"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.trusted);
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
                        message.profile = $root.pesto.models.Profile.decode(reader, reader.uint32());
                        break;
                    case 2:
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
                if (message.profile != null && message.hasOwnProperty("profile")) {
                    var error = $root.pesto.models.Profile.verify(message.profile);
                    if (error)
                        return "profile." + error;
                }
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
                if (object.profile != null) {
                    if (typeof object.profile !== "object")
                        throw TypeError(".pesto.models.Contact.profile: object expected");
                    message.profile = $root.pesto.models.Profile.fromObject(object.profile);
                }
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
                    object.profile = null;
                    object.trusted = false;
                }
                if (message.profile != null && message.hasOwnProperty("profile"))
                    object.profile = $root.pesto.models.Profile.toObject(message.profile, options);
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

        models.Transaction = (function() {

            /**
             * Properties of a Transaction.
             * @memberof pesto.models
             * @interface ITransaction
             * @property {pesto.models.AccountHolderType|null} [accountHolderType] Transaction accountHolderType
             * @property {pesto.models.IProfile|null} [userAccountHolder] Transaction userAccountHolder
             * @property {pesto.models.IClaim|null} [claimAccountHolder] Transaction claimAccountHolder
             * @property {pesto.models.IRoom|null} [roomAccountHolder] Transaction roomAccountHolder
             * @property {number|null} [amount] Transaction amount
             * @property {pesto.models.Transaction.Type|null} [transactionType] Transaction transactionType
             * @property {google.protobuf.ITimestamp|null} [timestamp] Transaction timestamp
             */

            /**
             * Constructs a new Transaction.
             * @memberof pesto.models
             * @classdesc Represents a Transaction.
             * @implements ITransaction
             * @constructor
             * @param {pesto.models.ITransaction=} [properties] Properties to set
             */
            function Transaction(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Transaction accountHolderType.
             * @member {pesto.models.AccountHolderType} accountHolderType
             * @memberof pesto.models.Transaction
             * @instance
             */
            Transaction.prototype.accountHolderType = 0;

            /**
             * Transaction userAccountHolder.
             * @member {pesto.models.IProfile|null|undefined} userAccountHolder
             * @memberof pesto.models.Transaction
             * @instance
             */
            Transaction.prototype.userAccountHolder = null;

            /**
             * Transaction claimAccountHolder.
             * @member {pesto.models.IClaim|null|undefined} claimAccountHolder
             * @memberof pesto.models.Transaction
             * @instance
             */
            Transaction.prototype.claimAccountHolder = null;

            /**
             * Transaction roomAccountHolder.
             * @member {pesto.models.IRoom|null|undefined} roomAccountHolder
             * @memberof pesto.models.Transaction
             * @instance
             */
            Transaction.prototype.roomAccountHolder = null;

            /**
             * Transaction amount.
             * @member {number} amount
             * @memberof pesto.models.Transaction
             * @instance
             */
            Transaction.prototype.amount = 0;

            /**
             * Transaction transactionType.
             * @member {pesto.models.Transaction.Type} transactionType
             * @memberof pesto.models.Transaction
             * @instance
             */
            Transaction.prototype.transactionType = 0;

            /**
             * Transaction timestamp.
             * @member {google.protobuf.ITimestamp|null|undefined} timestamp
             * @memberof pesto.models.Transaction
             * @instance
             */
            Transaction.prototype.timestamp = null;

            /**
             * Creates a new Transaction instance using the specified properties.
             * @function create
             * @memberof pesto.models.Transaction
             * @static
             * @param {pesto.models.ITransaction=} [properties] Properties to set
             * @returns {pesto.models.Transaction} Transaction instance
             */
            Transaction.create = function create(properties) {
                return new Transaction(properties);
            };

            /**
             * Encodes the specified Transaction message. Does not implicitly {@link pesto.models.Transaction.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.Transaction
             * @static
             * @param {pesto.models.ITransaction} message Transaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Transaction.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.accountHolderType != null && message.hasOwnProperty("accountHolderType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.accountHolderType);
                if (message.userAccountHolder != null && message.hasOwnProperty("userAccountHolder"))
                    $root.pesto.models.Profile.encode(message.userAccountHolder, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.claimAccountHolder != null && message.hasOwnProperty("claimAccountHolder"))
                    $root.pesto.models.Claim.encode(message.claimAccountHolder, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.roomAccountHolder != null && message.hasOwnProperty("roomAccountHolder"))
                    $root.pesto.models.Room.encode(message.roomAccountHolder, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.amount != null && message.hasOwnProperty("amount"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.amount);
                if (message.transactionType != null && message.hasOwnProperty("transactionType"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.transactionType);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    $root.google.protobuf.Timestamp.encode(message.timestamp, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Transaction message, length delimited. Does not implicitly {@link pesto.models.Transaction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.Transaction
             * @static
             * @param {pesto.models.ITransaction} message Transaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Transaction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Transaction message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.Transaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.Transaction} Transaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Transaction.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.Transaction();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.accountHolderType = reader.int32();
                        break;
                    case 2:
                        message.userAccountHolder = $root.pesto.models.Profile.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.claimAccountHolder = $root.pesto.models.Claim.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.roomAccountHolder = $root.pesto.models.Room.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.amount = reader.int32();
                        break;
                    case 6:
                        message.transactionType = reader.int32();
                        break;
                    case 7:
                        message.timestamp = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Transaction message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.Transaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.Transaction} Transaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Transaction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Transaction message.
             * @function verify
             * @memberof pesto.models.Transaction
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Transaction.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.accountHolderType != null && message.hasOwnProperty("accountHolderType"))
                    switch (message.accountHolderType) {
                    default:
                        return "accountHolderType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.userAccountHolder != null && message.hasOwnProperty("userAccountHolder")) {
                    var error = $root.pesto.models.Profile.verify(message.userAccountHolder);
                    if (error)
                        return "userAccountHolder." + error;
                }
                if (message.claimAccountHolder != null && message.hasOwnProperty("claimAccountHolder")) {
                    var error = $root.pesto.models.Claim.verify(message.claimAccountHolder);
                    if (error)
                        return "claimAccountHolder." + error;
                }
                if (message.roomAccountHolder != null && message.hasOwnProperty("roomAccountHolder")) {
                    var error = $root.pesto.models.Room.verify(message.roomAccountHolder);
                    if (error)
                        return "roomAccountHolder." + error;
                }
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount))
                        return "amount: integer expected";
                if (message.transactionType != null && message.hasOwnProperty("transactionType"))
                    switch (message.transactionType) {
                    default:
                        return "transactionType: enum value expected";
                    case 0:
                    case 1:
                        break;
                    }
                if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                    var error = $root.google.protobuf.Timestamp.verify(message.timestamp);
                    if (error)
                        return "timestamp." + error;
                }
                return null;
            };

            /**
             * Creates a Transaction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.Transaction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.Transaction} Transaction
             */
            Transaction.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.Transaction)
                    return object;
                var message = new $root.pesto.models.Transaction();
                switch (object.accountHolderType) {
                case "USER":
                case 0:
                    message.accountHolderType = 0;
                    break;
                case "CLAIM":
                case 1:
                    message.accountHolderType = 1;
                    break;
                case "ROOM":
                case 2:
                    message.accountHolderType = 2;
                    break;
                }
                if (object.userAccountHolder != null) {
                    if (typeof object.userAccountHolder !== "object")
                        throw TypeError(".pesto.models.Transaction.userAccountHolder: object expected");
                    message.userAccountHolder = $root.pesto.models.Profile.fromObject(object.userAccountHolder);
                }
                if (object.claimAccountHolder != null) {
                    if (typeof object.claimAccountHolder !== "object")
                        throw TypeError(".pesto.models.Transaction.claimAccountHolder: object expected");
                    message.claimAccountHolder = $root.pesto.models.Claim.fromObject(object.claimAccountHolder);
                }
                if (object.roomAccountHolder != null) {
                    if (typeof object.roomAccountHolder !== "object")
                        throw TypeError(".pesto.models.Transaction.roomAccountHolder: object expected");
                    message.roomAccountHolder = $root.pesto.models.Room.fromObject(object.roomAccountHolder);
                }
                if (object.amount != null)
                    message.amount = object.amount | 0;
                switch (object.transactionType) {
                case "FROM":
                case 0:
                    message.transactionType = 0;
                    break;
                case "TO":
                case 1:
                    message.transactionType = 1;
                    break;
                }
                if (object.timestamp != null) {
                    if (typeof object.timestamp !== "object")
                        throw TypeError(".pesto.models.Transaction.timestamp: object expected");
                    message.timestamp = $root.google.protobuf.Timestamp.fromObject(object.timestamp);
                }
                return message;
            };

            /**
             * Creates a plain object from a Transaction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.Transaction
             * @static
             * @param {pesto.models.Transaction} message Transaction
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Transaction.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.accountHolderType = options.enums === String ? "USER" : 0;
                    object.userAccountHolder = null;
                    object.claimAccountHolder = null;
                    object.roomAccountHolder = null;
                    object.amount = 0;
                    object.transactionType = options.enums === String ? "FROM" : 0;
                    object.timestamp = null;
                }
                if (message.accountHolderType != null && message.hasOwnProperty("accountHolderType"))
                    object.accountHolderType = options.enums === String ? $root.pesto.models.AccountHolderType[message.accountHolderType] : message.accountHolderType;
                if (message.userAccountHolder != null && message.hasOwnProperty("userAccountHolder"))
                    object.userAccountHolder = $root.pesto.models.Profile.toObject(message.userAccountHolder, options);
                if (message.claimAccountHolder != null && message.hasOwnProperty("claimAccountHolder"))
                    object.claimAccountHolder = $root.pesto.models.Claim.toObject(message.claimAccountHolder, options);
                if (message.roomAccountHolder != null && message.hasOwnProperty("roomAccountHolder"))
                    object.roomAccountHolder = $root.pesto.models.Room.toObject(message.roomAccountHolder, options);
                if (message.amount != null && message.hasOwnProperty("amount"))
                    object.amount = message.amount;
                if (message.transactionType != null && message.hasOwnProperty("transactionType"))
                    object.transactionType = options.enums === String ? $root.pesto.models.Transaction.Type[message.transactionType] : message.transactionType;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = $root.google.protobuf.Timestamp.toObject(message.timestamp, options);
                return object;
            };

            /**
             * Converts this Transaction to JSON.
             * @function toJSON
             * @memberof pesto.models.Transaction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Transaction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Type enum.
             * @name pesto.models.Transaction.Type
             * @enum {string}
             * @property {number} FROM=0 FROM value
             * @property {number} TO=1 TO value
             */
            Transaction.Type = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "FROM"] = 0;
                values[valuesById[1] = "TO"] = 1;
                return values;
            })();

            return Transaction;
        })();

        models.Profile = (function() {

            /**
             * Properties of a Profile.
             * @memberof pesto.models
             * @interface IProfile
             * @property {number|null} [uid] Profile uid
             * @property {string|null} [username] Profile username
             */

            /**
             * Constructs a new Profile.
             * @memberof pesto.models
             * @classdesc Represents a Profile.
             * @implements IProfile
             * @constructor
             * @param {pesto.models.IProfile=} [properties] Properties to set
             */
            function Profile(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Profile uid.
             * @member {number} uid
             * @memberof pesto.models.Profile
             * @instance
             */
            Profile.prototype.uid = 0;

            /**
             * Profile username.
             * @member {string} username
             * @memberof pesto.models.Profile
             * @instance
             */
            Profile.prototype.username = "";

            /**
             * Creates a new Profile instance using the specified properties.
             * @function create
             * @memberof pesto.models.Profile
             * @static
             * @param {pesto.models.IProfile=} [properties] Properties to set
             * @returns {pesto.models.Profile} Profile instance
             */
            Profile.create = function create(properties) {
                return new Profile(properties);
            };

            /**
             * Encodes the specified Profile message. Does not implicitly {@link pesto.models.Profile.verify|verify} messages.
             * @function encode
             * @memberof pesto.models.Profile
             * @static
             * @param {pesto.models.IProfile} message Profile message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Profile.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.uid != null && message.hasOwnProperty("uid"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
                if (message.username != null && message.hasOwnProperty("username"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                return writer;
            };

            /**
             * Encodes the specified Profile message, length delimited. Does not implicitly {@link pesto.models.Profile.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.models.Profile
             * @static
             * @param {pesto.models.IProfile} message Profile message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Profile.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Profile message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.models.Profile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.models.Profile} Profile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Profile.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.models.Profile();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
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
             * Decodes a Profile message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.models.Profile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.models.Profile} Profile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Profile.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Profile message.
             * @function verify
             * @memberof pesto.models.Profile
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Profile.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.uid != null && message.hasOwnProperty("uid"))
                    if (!$util.isInteger(message.uid))
                        return "uid: integer expected";
                if (message.username != null && message.hasOwnProperty("username"))
                    if (!$util.isString(message.username))
                        return "username: string expected";
                return null;
            };

            /**
             * Creates a Profile message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.models.Profile
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.models.Profile} Profile
             */
            Profile.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.models.Profile)
                    return object;
                var message = new $root.pesto.models.Profile();
                if (object.uid != null)
                    message.uid = object.uid | 0;
                if (object.username != null)
                    message.username = String(object.username);
                return message;
            };

            /**
             * Creates a plain object from a Profile message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.models.Profile
             * @static
             * @param {pesto.models.Profile} message Profile
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Profile.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.uid = 0;
                    object.username = "";
                }
                if (message.uid != null && message.hasOwnProperty("uid"))
                    object.uid = message.uid;
                if (message.username != null && message.hasOwnProperty("username"))
                    object.username = message.username;
                return object;
            };

            /**
             * Converts this Profile to JSON.
             * @function toJSON
             * @memberof pesto.models.Profile
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Profile.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Profile;
        })();

        /**
         * AccountHolderType enum.
         * @name pesto.models.AccountHolderType
         * @enum {string}
         * @property {number} USER=0 USER value
         * @property {number} CLAIM=1 CLAIM value
         * @property {number} ROOM=2 ROOM value
         */
        models.AccountHolderType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "USER"] = 0;
            values[valuesById[1] = "CLAIM"] = 1;
            values[valuesById[2] = "ROOM"] = 2;
            return values;
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

        user_messages.RegisterDeviceTokenRequest = (function() {

            /**
             * Properties of a RegisterDeviceTokenRequest.
             * @memberof pesto.user_messages
             * @interface IRegisterDeviceTokenRequest
             * @property {number|null} [userId] RegisterDeviceTokenRequest userId
             * @property {string|null} [deviceToken] RegisterDeviceTokenRequest deviceToken
             */

            /**
             * Constructs a new RegisterDeviceTokenRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a RegisterDeviceTokenRequest.
             * @implements IRegisterDeviceTokenRequest
             * @constructor
             * @param {pesto.user_messages.IRegisterDeviceTokenRequest=} [properties] Properties to set
             */
            function RegisterDeviceTokenRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RegisterDeviceTokenRequest userId.
             * @member {number} userId
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @instance
             */
            RegisterDeviceTokenRequest.prototype.userId = 0;

            /**
             * RegisterDeviceTokenRequest deviceToken.
             * @member {string} deviceToken
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @instance
             */
            RegisterDeviceTokenRequest.prototype.deviceToken = "";

            /**
             * Creates a new RegisterDeviceTokenRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @static
             * @param {pesto.user_messages.IRegisterDeviceTokenRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.RegisterDeviceTokenRequest} RegisterDeviceTokenRequest instance
             */
            RegisterDeviceTokenRequest.create = function create(properties) {
                return new RegisterDeviceTokenRequest(properties);
            };

            /**
             * Encodes the specified RegisterDeviceTokenRequest message. Does not implicitly {@link pesto.user_messages.RegisterDeviceTokenRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @static
             * @param {pesto.user_messages.IRegisterDeviceTokenRequest} message RegisterDeviceTokenRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterDeviceTokenRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.userId != null && message.hasOwnProperty("userId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
                if (message.deviceToken != null && message.hasOwnProperty("deviceToken"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.deviceToken);
                return writer;
            };

            /**
             * Encodes the specified RegisterDeviceTokenRequest message, length delimited. Does not implicitly {@link pesto.user_messages.RegisterDeviceTokenRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @static
             * @param {pesto.user_messages.IRegisterDeviceTokenRequest} message RegisterDeviceTokenRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RegisterDeviceTokenRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RegisterDeviceTokenRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.RegisterDeviceTokenRequest} RegisterDeviceTokenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterDeviceTokenRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.RegisterDeviceTokenRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.userId = reader.int32();
                        break;
                    case 2:
                        message.deviceToken = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RegisterDeviceTokenRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.RegisterDeviceTokenRequest} RegisterDeviceTokenRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RegisterDeviceTokenRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RegisterDeviceTokenRequest message.
             * @function verify
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RegisterDeviceTokenRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.userId != null && message.hasOwnProperty("userId"))
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                if (message.deviceToken != null && message.hasOwnProperty("deviceToken"))
                    if (!$util.isString(message.deviceToken))
                        return "deviceToken: string expected";
                return null;
            };

            /**
             * Creates a RegisterDeviceTokenRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.RegisterDeviceTokenRequest} RegisterDeviceTokenRequest
             */
            RegisterDeviceTokenRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.RegisterDeviceTokenRequest)
                    return object;
                var message = new $root.pesto.user_messages.RegisterDeviceTokenRequest();
                if (object.userId != null)
                    message.userId = object.userId | 0;
                if (object.deviceToken != null)
                    message.deviceToken = String(object.deviceToken);
                return message;
            };

            /**
             * Creates a plain object from a RegisterDeviceTokenRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @static
             * @param {pesto.user_messages.RegisterDeviceTokenRequest} message RegisterDeviceTokenRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RegisterDeviceTokenRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.userId = 0;
                    object.deviceToken = "";
                }
                if (message.userId != null && message.hasOwnProperty("userId"))
                    object.userId = message.userId;
                if (message.deviceToken != null && message.hasOwnProperty("deviceToken"))
                    object.deviceToken = message.deviceToken;
                return object;
            };

            /**
             * Converts this RegisterDeviceTokenRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.RegisterDeviceTokenRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RegisterDeviceTokenRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RegisterDeviceTokenRequest;
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

        user_messages.SuccessResponse = (function() {

            /**
             * Properties of a SuccessResponse.
             * @memberof pesto.user_messages
             * @interface ISuccessResponse
             * @property {boolean|null} [successful] SuccessResponse successful
             */

            /**
             * Constructs a new SuccessResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a SuccessResponse.
             * @implements ISuccessResponse
             * @constructor
             * @param {pesto.user_messages.ISuccessResponse=} [properties] Properties to set
             */
            function SuccessResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SuccessResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.SuccessResponse
             * @instance
             */
            SuccessResponse.prototype.successful = false;

            /**
             * Creates a new SuccessResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.SuccessResponse
             * @static
             * @param {pesto.user_messages.ISuccessResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.SuccessResponse} SuccessResponse instance
             */
            SuccessResponse.create = function create(properties) {
                return new SuccessResponse(properties);
            };

            /**
             * Encodes the specified SuccessResponse message. Does not implicitly {@link pesto.user_messages.SuccessResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.SuccessResponse
             * @static
             * @param {pesto.user_messages.ISuccessResponse} message SuccessResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SuccessResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.successful);
                return writer;
            };

            /**
             * Encodes the specified SuccessResponse message, length delimited. Does not implicitly {@link pesto.user_messages.SuccessResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.SuccessResponse
             * @static
             * @param {pesto.user_messages.ISuccessResponse} message SuccessResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SuccessResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SuccessResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.SuccessResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.SuccessResponse} SuccessResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SuccessResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.SuccessResponse();
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
             * Decodes a SuccessResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.SuccessResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.SuccessResponse} SuccessResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SuccessResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SuccessResponse message.
             * @function verify
             * @memberof pesto.user_messages.SuccessResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SuccessResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                return null;
            };

            /**
             * Creates a SuccessResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.SuccessResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.SuccessResponse} SuccessResponse
             */
            SuccessResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.SuccessResponse)
                    return object;
                var message = new $root.pesto.user_messages.SuccessResponse();
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                return message;
            };

            /**
             * Creates a plain object from a SuccessResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.SuccessResponse
             * @static
             * @param {pesto.user_messages.SuccessResponse} message SuccessResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SuccessResponse.toObject = function toObject(message, options) {
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
             * Converts this SuccessResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.SuccessResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SuccessResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SuccessResponse;
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

        user_messages.GetTransactionsResponse = (function() {

            /**
             * Properties of a GetTransactionsResponse.
             * @memberof pesto.user_messages
             * @interface IGetTransactionsResponse
             * @property {Array.<pesto.models.ITransaction>|null} [transactions] GetTransactionsResponse transactions
             */

            /**
             * Constructs a new GetTransactionsResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a GetTransactionsResponse.
             * @implements IGetTransactionsResponse
             * @constructor
             * @param {pesto.user_messages.IGetTransactionsResponse=} [properties] Properties to set
             */
            function GetTransactionsResponse(properties) {
                this.transactions = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetTransactionsResponse transactions.
             * @member {Array.<pesto.models.ITransaction>} transactions
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @instance
             */
            GetTransactionsResponse.prototype.transactions = $util.emptyArray;

            /**
             * Creates a new GetTransactionsResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @static
             * @param {pesto.user_messages.IGetTransactionsResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.GetTransactionsResponse} GetTransactionsResponse instance
             */
            GetTransactionsResponse.create = function create(properties) {
                return new GetTransactionsResponse(properties);
            };

            /**
             * Encodes the specified GetTransactionsResponse message. Does not implicitly {@link pesto.user_messages.GetTransactionsResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @static
             * @param {pesto.user_messages.IGetTransactionsResponse} message GetTransactionsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTransactionsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.transactions != null && message.transactions.length)
                    for (var i = 0; i < message.transactions.length; ++i)
                        $root.pesto.models.Transaction.encode(message.transactions[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GetTransactionsResponse message, length delimited. Does not implicitly {@link pesto.user_messages.GetTransactionsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @static
             * @param {pesto.user_messages.IGetTransactionsResponse} message GetTransactionsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetTransactionsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetTransactionsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.GetTransactionsResponse} GetTransactionsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTransactionsResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.GetTransactionsResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.transactions && message.transactions.length))
                            message.transactions = [];
                        message.transactions.push($root.pesto.models.Transaction.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetTransactionsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.GetTransactionsResponse} GetTransactionsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetTransactionsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetTransactionsResponse message.
             * @function verify
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetTransactionsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.transactions != null && message.hasOwnProperty("transactions")) {
                    if (!Array.isArray(message.transactions))
                        return "transactions: array expected";
                    for (var i = 0; i < message.transactions.length; ++i) {
                        var error = $root.pesto.models.Transaction.verify(message.transactions[i]);
                        if (error)
                            return "transactions." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a GetTransactionsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.GetTransactionsResponse} GetTransactionsResponse
             */
            GetTransactionsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.GetTransactionsResponse)
                    return object;
                var message = new $root.pesto.user_messages.GetTransactionsResponse();
                if (object.transactions) {
                    if (!Array.isArray(object.transactions))
                        throw TypeError(".pesto.user_messages.GetTransactionsResponse.transactions: array expected");
                    message.transactions = [];
                    for (var i = 0; i < object.transactions.length; ++i) {
                        if (typeof object.transactions[i] !== "object")
                            throw TypeError(".pesto.user_messages.GetTransactionsResponse.transactions: object expected");
                        message.transactions[i] = $root.pesto.models.Transaction.fromObject(object.transactions[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a GetTransactionsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @static
             * @param {pesto.user_messages.GetTransactionsResponse} message GetTransactionsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetTransactionsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.transactions = [];
                if (message.transactions && message.transactions.length) {
                    object.transactions = [];
                    for (var j = 0; j < message.transactions.length; ++j)
                        object.transactions[j] = $root.pesto.models.Transaction.toObject(message.transactions[j], options);
                }
                return object;
            };

            /**
             * Converts this GetTransactionsResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.GetTransactionsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetTransactionsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetTransactionsResponse;
        })();

        user_messages.CheckPasscodeRequest = (function() {

            /**
             * Properties of a CheckPasscodeRequest.
             * @memberof pesto.user_messages
             * @interface ICheckPasscodeRequest
             * @property {string|null} [passcode] CheckPasscodeRequest passcode
             */

            /**
             * Constructs a new CheckPasscodeRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a CheckPasscodeRequest.
             * @implements ICheckPasscodeRequest
             * @constructor
             * @param {pesto.user_messages.ICheckPasscodeRequest=} [properties] Properties to set
             */
            function CheckPasscodeRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CheckPasscodeRequest passcode.
             * @member {string} passcode
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @instance
             */
            CheckPasscodeRequest.prototype.passcode = "";

            /**
             * Creates a new CheckPasscodeRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @static
             * @param {pesto.user_messages.ICheckPasscodeRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.CheckPasscodeRequest} CheckPasscodeRequest instance
             */
            CheckPasscodeRequest.create = function create(properties) {
                return new CheckPasscodeRequest(properties);
            };

            /**
             * Encodes the specified CheckPasscodeRequest message. Does not implicitly {@link pesto.user_messages.CheckPasscodeRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @static
             * @param {pesto.user_messages.ICheckPasscodeRequest} message CheckPasscodeRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckPasscodeRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.passcode != null && message.hasOwnProperty("passcode"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.passcode);
                return writer;
            };

            /**
             * Encodes the specified CheckPasscodeRequest message, length delimited. Does not implicitly {@link pesto.user_messages.CheckPasscodeRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @static
             * @param {pesto.user_messages.ICheckPasscodeRequest} message CheckPasscodeRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckPasscodeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CheckPasscodeRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.CheckPasscodeRequest} CheckPasscodeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckPasscodeRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.CheckPasscodeRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.passcode = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CheckPasscodeRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.CheckPasscodeRequest} CheckPasscodeRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckPasscodeRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CheckPasscodeRequest message.
             * @function verify
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CheckPasscodeRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.passcode != null && message.hasOwnProperty("passcode"))
                    if (!$util.isString(message.passcode))
                        return "passcode: string expected";
                return null;
            };

            /**
             * Creates a CheckPasscodeRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.CheckPasscodeRequest} CheckPasscodeRequest
             */
            CheckPasscodeRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.CheckPasscodeRequest)
                    return object;
                var message = new $root.pesto.user_messages.CheckPasscodeRequest();
                if (object.passcode != null)
                    message.passcode = String(object.passcode);
                return message;
            };

            /**
             * Creates a plain object from a CheckPasscodeRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @static
             * @param {pesto.user_messages.CheckPasscodeRequest} message CheckPasscodeRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CheckPasscodeRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.passcode = "";
                if (message.passcode != null && message.hasOwnProperty("passcode"))
                    object.passcode = message.passcode;
                return object;
            };

            /**
             * Converts this CheckPasscodeRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.CheckPasscodeRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CheckPasscodeRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CheckPasscodeRequest;
        })();

        user_messages.CreateClaimRequest = (function() {

            /**
             * Properties of a CreateClaimRequest.
             * @memberof pesto.user_messages
             * @interface ICreateClaimRequest
             * @property {number|null} [amount] CreateClaimRequest amount
             * @property {number|null} [ownerId] CreateClaimRequest ownerId
             */

            /**
             * Constructs a new CreateClaimRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a CreateClaimRequest.
             * @implements ICreateClaimRequest
             * @constructor
             * @param {pesto.user_messages.ICreateClaimRequest=} [properties] Properties to set
             */
            function CreateClaimRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateClaimRequest amount.
             * @member {number} amount
             * @memberof pesto.user_messages.CreateClaimRequest
             * @instance
             */
            CreateClaimRequest.prototype.amount = 0;

            /**
             * CreateClaimRequest ownerId.
             * @member {number} ownerId
             * @memberof pesto.user_messages.CreateClaimRequest
             * @instance
             */
            CreateClaimRequest.prototype.ownerId = 0;

            /**
             * Creates a new CreateClaimRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.CreateClaimRequest
             * @static
             * @param {pesto.user_messages.ICreateClaimRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.CreateClaimRequest} CreateClaimRequest instance
             */
            CreateClaimRequest.create = function create(properties) {
                return new CreateClaimRequest(properties);
            };

            /**
             * Encodes the specified CreateClaimRequest message. Does not implicitly {@link pesto.user_messages.CreateClaimRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.CreateClaimRequest
             * @static
             * @param {pesto.user_messages.ICreateClaimRequest} message CreateClaimRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateClaimRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.amount != null && message.hasOwnProperty("amount"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.amount);
                if (message.ownerId != null && message.hasOwnProperty("ownerId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ownerId);
                return writer;
            };

            /**
             * Encodes the specified CreateClaimRequest message, length delimited. Does not implicitly {@link pesto.user_messages.CreateClaimRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.CreateClaimRequest
             * @static
             * @param {pesto.user_messages.ICreateClaimRequest} message CreateClaimRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateClaimRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CreateClaimRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.CreateClaimRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.CreateClaimRequest} CreateClaimRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateClaimRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.CreateClaimRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.amount = reader.int32();
                        break;
                    case 2:
                        message.ownerId = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CreateClaimRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.CreateClaimRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.CreateClaimRequest} CreateClaimRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateClaimRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CreateClaimRequest message.
             * @function verify
             * @memberof pesto.user_messages.CreateClaimRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CreateClaimRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.amount != null && message.hasOwnProperty("amount"))
                    if (!$util.isInteger(message.amount))
                        return "amount: integer expected";
                if (message.ownerId != null && message.hasOwnProperty("ownerId"))
                    if (!$util.isInteger(message.ownerId))
                        return "ownerId: integer expected";
                return null;
            };

            /**
             * Creates a CreateClaimRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.CreateClaimRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.CreateClaimRequest} CreateClaimRequest
             */
            CreateClaimRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.CreateClaimRequest)
                    return object;
                var message = new $root.pesto.user_messages.CreateClaimRequest();
                if (object.amount != null)
                    message.amount = object.amount | 0;
                if (object.ownerId != null)
                    message.ownerId = object.ownerId | 0;
                return message;
            };

            /**
             * Creates a plain object from a CreateClaimRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.CreateClaimRequest
             * @static
             * @param {pesto.user_messages.CreateClaimRequest} message CreateClaimRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateClaimRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.amount = 0;
                    object.ownerId = 0;
                }
                if (message.amount != null && message.hasOwnProperty("amount"))
                    object.amount = message.amount;
                if (message.ownerId != null && message.hasOwnProperty("ownerId"))
                    object.ownerId = message.ownerId;
                return object;
            };

            /**
             * Converts this CreateClaimRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.CreateClaimRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateClaimRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateClaimRequest;
        })();

        user_messages.CreateClaimResponse = (function() {

            /**
             * Properties of a CreateClaimResponse.
             * @memberof pesto.user_messages
             * @interface ICreateClaimResponse
             * @property {boolean|null} [successful] CreateClaimResponse successful
             * @property {pesto.models.IClaim|null} [claim] CreateClaimResponse claim
             */

            /**
             * Constructs a new CreateClaimResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a CreateClaimResponse.
             * @implements ICreateClaimResponse
             * @constructor
             * @param {pesto.user_messages.ICreateClaimResponse=} [properties] Properties to set
             */
            function CreateClaimResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateClaimResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.CreateClaimResponse
             * @instance
             */
            CreateClaimResponse.prototype.successful = false;

            /**
             * CreateClaimResponse claim.
             * @member {pesto.models.IClaim|null|undefined} claim
             * @memberof pesto.user_messages.CreateClaimResponse
             * @instance
             */
            CreateClaimResponse.prototype.claim = null;

            /**
             * Creates a new CreateClaimResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.CreateClaimResponse
             * @static
             * @param {pesto.user_messages.ICreateClaimResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.CreateClaimResponse} CreateClaimResponse instance
             */
            CreateClaimResponse.create = function create(properties) {
                return new CreateClaimResponse(properties);
            };

            /**
             * Encodes the specified CreateClaimResponse message. Does not implicitly {@link pesto.user_messages.CreateClaimResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.CreateClaimResponse
             * @static
             * @param {pesto.user_messages.ICreateClaimResponse} message CreateClaimResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateClaimResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.successful);
                if (message.claim != null && message.hasOwnProperty("claim"))
                    $root.pesto.models.Claim.encode(message.claim, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified CreateClaimResponse message, length delimited. Does not implicitly {@link pesto.user_messages.CreateClaimResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.CreateClaimResponse
             * @static
             * @param {pesto.user_messages.ICreateClaimResponse} message CreateClaimResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateClaimResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CreateClaimResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.CreateClaimResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.CreateClaimResponse} CreateClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateClaimResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.CreateClaimResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.successful = reader.bool();
                        break;
                    case 2:
                        message.claim = $root.pesto.models.Claim.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CreateClaimResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.CreateClaimResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.CreateClaimResponse} CreateClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateClaimResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CreateClaimResponse message.
             * @function verify
             * @memberof pesto.user_messages.CreateClaimResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CreateClaimResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                if (message.claim != null && message.hasOwnProperty("claim")) {
                    var error = $root.pesto.models.Claim.verify(message.claim);
                    if (error)
                        return "claim." + error;
                }
                return null;
            };

            /**
             * Creates a CreateClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.CreateClaimResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.CreateClaimResponse} CreateClaimResponse
             */
            CreateClaimResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.CreateClaimResponse)
                    return object;
                var message = new $root.pesto.user_messages.CreateClaimResponse();
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                if (object.claim != null) {
                    if (typeof object.claim !== "object")
                        throw TypeError(".pesto.user_messages.CreateClaimResponse.claim: object expected");
                    message.claim = $root.pesto.models.Claim.fromObject(object.claim);
                }
                return message;
            };

            /**
             * Creates a plain object from a CreateClaimResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.CreateClaimResponse
             * @static
             * @param {pesto.user_messages.CreateClaimResponse} message CreateClaimResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateClaimResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.successful = false;
                    object.claim = null;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                if (message.claim != null && message.hasOwnProperty("claim"))
                    object.claim = $root.pesto.models.Claim.toObject(message.claim, options);
                return object;
            };

            /**
             * Converts this CreateClaimResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.CreateClaimResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateClaimResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateClaimResponse;
        })();

        user_messages.GetClaimResponse = (function() {

            /**
             * Properties of a GetClaimResponse.
             * @memberof pesto.user_messages
             * @interface IGetClaimResponse
             * @property {pesto.models.IClaim|null} [claim] GetClaimResponse claim
             */

            /**
             * Constructs a new GetClaimResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a GetClaimResponse.
             * @implements IGetClaimResponse
             * @constructor
             * @param {pesto.user_messages.IGetClaimResponse=} [properties] Properties to set
             */
            function GetClaimResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetClaimResponse claim.
             * @member {pesto.models.IClaim|null|undefined} claim
             * @memberof pesto.user_messages.GetClaimResponse
             * @instance
             */
            GetClaimResponse.prototype.claim = null;

            /**
             * Creates a new GetClaimResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.GetClaimResponse
             * @static
             * @param {pesto.user_messages.IGetClaimResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.GetClaimResponse} GetClaimResponse instance
             */
            GetClaimResponse.create = function create(properties) {
                return new GetClaimResponse(properties);
            };

            /**
             * Encodes the specified GetClaimResponse message. Does not implicitly {@link pesto.user_messages.GetClaimResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.GetClaimResponse
             * @static
             * @param {pesto.user_messages.IGetClaimResponse} message GetClaimResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetClaimResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.claim != null && message.hasOwnProperty("claim"))
                    $root.pesto.models.Claim.encode(message.claim, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified GetClaimResponse message, length delimited. Does not implicitly {@link pesto.user_messages.GetClaimResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.GetClaimResponse
             * @static
             * @param {pesto.user_messages.IGetClaimResponse} message GetClaimResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetClaimResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetClaimResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.GetClaimResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.GetClaimResponse} GetClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetClaimResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.GetClaimResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 2:
                        message.claim = $root.pesto.models.Claim.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetClaimResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.GetClaimResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.GetClaimResponse} GetClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetClaimResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetClaimResponse message.
             * @function verify
             * @memberof pesto.user_messages.GetClaimResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetClaimResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.claim != null && message.hasOwnProperty("claim")) {
                    var error = $root.pesto.models.Claim.verify(message.claim);
                    if (error)
                        return "claim." + error;
                }
                return null;
            };

            /**
             * Creates a GetClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.GetClaimResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.GetClaimResponse} GetClaimResponse
             */
            GetClaimResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.GetClaimResponse)
                    return object;
                var message = new $root.pesto.user_messages.GetClaimResponse();
                if (object.claim != null) {
                    if (typeof object.claim !== "object")
                        throw TypeError(".pesto.user_messages.GetClaimResponse.claim: object expected");
                    message.claim = $root.pesto.models.Claim.fromObject(object.claim);
                }
                return message;
            };

            /**
             * Creates a plain object from a GetClaimResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.GetClaimResponse
             * @static
             * @param {pesto.user_messages.GetClaimResponse} message GetClaimResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetClaimResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.claim = null;
                if (message.claim != null && message.hasOwnProperty("claim"))
                    object.claim = $root.pesto.models.Claim.toObject(message.claim, options);
                return object;
            };

            /**
             * Converts this GetClaimResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.GetClaimResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetClaimResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetClaimResponse;
        })();

        user_messages.AcceptClaimRequest = (function() {

            /**
             * Properties of an AcceptClaimRequest.
             * @memberof pesto.user_messages
             * @interface IAcceptClaimRequest
             * @property {number|null} [claimId] AcceptClaimRequest claimId
             * @property {number|null} [receiverId] AcceptClaimRequest receiverId
             */

            /**
             * Constructs a new AcceptClaimRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents an AcceptClaimRequest.
             * @implements IAcceptClaimRequest
             * @constructor
             * @param {pesto.user_messages.IAcceptClaimRequest=} [properties] Properties to set
             */
            function AcceptClaimRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AcceptClaimRequest claimId.
             * @member {number} claimId
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @instance
             */
            AcceptClaimRequest.prototype.claimId = 0;

            /**
             * AcceptClaimRequest receiverId.
             * @member {number} receiverId
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @instance
             */
            AcceptClaimRequest.prototype.receiverId = 0;

            /**
             * Creates a new AcceptClaimRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @static
             * @param {pesto.user_messages.IAcceptClaimRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.AcceptClaimRequest} AcceptClaimRequest instance
             */
            AcceptClaimRequest.create = function create(properties) {
                return new AcceptClaimRequest(properties);
            };

            /**
             * Encodes the specified AcceptClaimRequest message. Does not implicitly {@link pesto.user_messages.AcceptClaimRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @static
             * @param {pesto.user_messages.IAcceptClaimRequest} message AcceptClaimRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AcceptClaimRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.claimId != null && message.hasOwnProperty("claimId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.claimId);
                if (message.receiverId != null && message.hasOwnProperty("receiverId"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.receiverId);
                return writer;
            };

            /**
             * Encodes the specified AcceptClaimRequest message, length delimited. Does not implicitly {@link pesto.user_messages.AcceptClaimRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @static
             * @param {pesto.user_messages.IAcceptClaimRequest} message AcceptClaimRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AcceptClaimRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AcceptClaimRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.AcceptClaimRequest} AcceptClaimRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AcceptClaimRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.AcceptClaimRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.claimId = reader.int32();
                        break;
                    case 2:
                        message.receiverId = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AcceptClaimRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.AcceptClaimRequest} AcceptClaimRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AcceptClaimRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AcceptClaimRequest message.
             * @function verify
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AcceptClaimRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.claimId != null && message.hasOwnProperty("claimId"))
                    if (!$util.isInteger(message.claimId))
                        return "claimId: integer expected";
                if (message.receiverId != null && message.hasOwnProperty("receiverId"))
                    if (!$util.isInteger(message.receiverId))
                        return "receiverId: integer expected";
                return null;
            };

            /**
             * Creates an AcceptClaimRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.AcceptClaimRequest} AcceptClaimRequest
             */
            AcceptClaimRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.AcceptClaimRequest)
                    return object;
                var message = new $root.pesto.user_messages.AcceptClaimRequest();
                if (object.claimId != null)
                    message.claimId = object.claimId | 0;
                if (object.receiverId != null)
                    message.receiverId = object.receiverId | 0;
                return message;
            };

            /**
             * Creates a plain object from an AcceptClaimRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @static
             * @param {pesto.user_messages.AcceptClaimRequest} message AcceptClaimRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AcceptClaimRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.claimId = 0;
                    object.receiverId = 0;
                }
                if (message.claimId != null && message.hasOwnProperty("claimId"))
                    object.claimId = message.claimId;
                if (message.receiverId != null && message.hasOwnProperty("receiverId"))
                    object.receiverId = message.receiverId;
                return object;
            };

            /**
             * Converts this AcceptClaimRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.AcceptClaimRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AcceptClaimRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AcceptClaimRequest;
        })();

        user_messages.AcceptClaimResponse = (function() {

            /**
             * Properties of an AcceptClaimResponse.
             * @memberof pesto.user_messages
             * @interface IAcceptClaimResponse
             * @property {boolean|null} [successful] AcceptClaimResponse successful
             * @property {pesto.models.IClaim|null} [claim] AcceptClaimResponse claim
             */

            /**
             * Constructs a new AcceptClaimResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents an AcceptClaimResponse.
             * @implements IAcceptClaimResponse
             * @constructor
             * @param {pesto.user_messages.IAcceptClaimResponse=} [properties] Properties to set
             */
            function AcceptClaimResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * AcceptClaimResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @instance
             */
            AcceptClaimResponse.prototype.successful = false;

            /**
             * AcceptClaimResponse claim.
             * @member {pesto.models.IClaim|null|undefined} claim
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @instance
             */
            AcceptClaimResponse.prototype.claim = null;

            /**
             * Creates a new AcceptClaimResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @static
             * @param {pesto.user_messages.IAcceptClaimResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.AcceptClaimResponse} AcceptClaimResponse instance
             */
            AcceptClaimResponse.create = function create(properties) {
                return new AcceptClaimResponse(properties);
            };

            /**
             * Encodes the specified AcceptClaimResponse message. Does not implicitly {@link pesto.user_messages.AcceptClaimResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @static
             * @param {pesto.user_messages.IAcceptClaimResponse} message AcceptClaimResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AcceptClaimResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.successful);
                if (message.claim != null && message.hasOwnProperty("claim"))
                    $root.pesto.models.Claim.encode(message.claim, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified AcceptClaimResponse message, length delimited. Does not implicitly {@link pesto.user_messages.AcceptClaimResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @static
             * @param {pesto.user_messages.IAcceptClaimResponse} message AcceptClaimResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AcceptClaimResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an AcceptClaimResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.AcceptClaimResponse} AcceptClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AcceptClaimResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.AcceptClaimResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.successful = reader.bool();
                        break;
                    case 2:
                        message.claim = $root.pesto.models.Claim.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an AcceptClaimResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.AcceptClaimResponse} AcceptClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AcceptClaimResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an AcceptClaimResponse message.
             * @function verify
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AcceptClaimResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                if (message.claim != null && message.hasOwnProperty("claim")) {
                    var error = $root.pesto.models.Claim.verify(message.claim);
                    if (error)
                        return "claim." + error;
                }
                return null;
            };

            /**
             * Creates an AcceptClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.AcceptClaimResponse} AcceptClaimResponse
             */
            AcceptClaimResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.AcceptClaimResponse)
                    return object;
                var message = new $root.pesto.user_messages.AcceptClaimResponse();
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                if (object.claim != null) {
                    if (typeof object.claim !== "object")
                        throw TypeError(".pesto.user_messages.AcceptClaimResponse.claim: object expected");
                    message.claim = $root.pesto.models.Claim.fromObject(object.claim);
                }
                return message;
            };

            /**
             * Creates a plain object from an AcceptClaimResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @static
             * @param {pesto.user_messages.AcceptClaimResponse} message AcceptClaimResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AcceptClaimResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.successful = false;
                    object.claim = null;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                if (message.claim != null && message.hasOwnProperty("claim"))
                    object.claim = $root.pesto.models.Claim.toObject(message.claim, options);
                return object;
            };

            /**
             * Converts this AcceptClaimResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.AcceptClaimResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AcceptClaimResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return AcceptClaimResponse;
        })();

        user_messages.RevokeClaimRequest = (function() {

            /**
             * Properties of a RevokeClaimRequest.
             * @memberof pesto.user_messages
             * @interface IRevokeClaimRequest
             * @property {number|null} [claimId] RevokeClaimRequest claimId
             */

            /**
             * Constructs a new RevokeClaimRequest.
             * @memberof pesto.user_messages
             * @classdesc Represents a RevokeClaimRequest.
             * @implements IRevokeClaimRequest
             * @constructor
             * @param {pesto.user_messages.IRevokeClaimRequest=} [properties] Properties to set
             */
            function RevokeClaimRequest(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RevokeClaimRequest claimId.
             * @member {number} claimId
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @instance
             */
            RevokeClaimRequest.prototype.claimId = 0;

            /**
             * Creates a new RevokeClaimRequest instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @static
             * @param {pesto.user_messages.IRevokeClaimRequest=} [properties] Properties to set
             * @returns {pesto.user_messages.RevokeClaimRequest} RevokeClaimRequest instance
             */
            RevokeClaimRequest.create = function create(properties) {
                return new RevokeClaimRequest(properties);
            };

            /**
             * Encodes the specified RevokeClaimRequest message. Does not implicitly {@link pesto.user_messages.RevokeClaimRequest.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @static
             * @param {pesto.user_messages.IRevokeClaimRequest} message RevokeClaimRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RevokeClaimRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.claimId != null && message.hasOwnProperty("claimId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.claimId);
                return writer;
            };

            /**
             * Encodes the specified RevokeClaimRequest message, length delimited. Does not implicitly {@link pesto.user_messages.RevokeClaimRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @static
             * @param {pesto.user_messages.IRevokeClaimRequest} message RevokeClaimRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RevokeClaimRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RevokeClaimRequest message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.RevokeClaimRequest} RevokeClaimRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RevokeClaimRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.RevokeClaimRequest();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.claimId = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RevokeClaimRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.RevokeClaimRequest} RevokeClaimRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RevokeClaimRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RevokeClaimRequest message.
             * @function verify
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RevokeClaimRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.claimId != null && message.hasOwnProperty("claimId"))
                    if (!$util.isInteger(message.claimId))
                        return "claimId: integer expected";
                return null;
            };

            /**
             * Creates a RevokeClaimRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.RevokeClaimRequest} RevokeClaimRequest
             */
            RevokeClaimRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.RevokeClaimRequest)
                    return object;
                var message = new $root.pesto.user_messages.RevokeClaimRequest();
                if (object.claimId != null)
                    message.claimId = object.claimId | 0;
                return message;
            };

            /**
             * Creates a plain object from a RevokeClaimRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @static
             * @param {pesto.user_messages.RevokeClaimRequest} message RevokeClaimRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RevokeClaimRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.claimId = 0;
                if (message.claimId != null && message.hasOwnProperty("claimId"))
                    object.claimId = message.claimId;
                return object;
            };

            /**
             * Converts this RevokeClaimRequest to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.RevokeClaimRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RevokeClaimRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RevokeClaimRequest;
        })();

        user_messages.RevokeClaimResponse = (function() {

            /**
             * Properties of a RevokeClaimResponse.
             * @memberof pesto.user_messages
             * @interface IRevokeClaimResponse
             * @property {boolean|null} [successful] RevokeClaimResponse successful
             * @property {pesto.models.IClaim|null} [claim] RevokeClaimResponse claim
             */

            /**
             * Constructs a new RevokeClaimResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a RevokeClaimResponse.
             * @implements IRevokeClaimResponse
             * @constructor
             * @param {pesto.user_messages.IRevokeClaimResponse=} [properties] Properties to set
             */
            function RevokeClaimResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RevokeClaimResponse successful.
             * @member {boolean} successful
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @instance
             */
            RevokeClaimResponse.prototype.successful = false;

            /**
             * RevokeClaimResponse claim.
             * @member {pesto.models.IClaim|null|undefined} claim
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @instance
             */
            RevokeClaimResponse.prototype.claim = null;

            /**
             * Creates a new RevokeClaimResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @static
             * @param {pesto.user_messages.IRevokeClaimResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.RevokeClaimResponse} RevokeClaimResponse instance
             */
            RevokeClaimResponse.create = function create(properties) {
                return new RevokeClaimResponse(properties);
            };

            /**
             * Encodes the specified RevokeClaimResponse message. Does not implicitly {@link pesto.user_messages.RevokeClaimResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @static
             * @param {pesto.user_messages.IRevokeClaimResponse} message RevokeClaimResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RevokeClaimResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.successful != null && message.hasOwnProperty("successful"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.successful);
                if (message.claim != null && message.hasOwnProperty("claim"))
                    $root.pesto.models.Claim.encode(message.claim, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RevokeClaimResponse message, length delimited. Does not implicitly {@link pesto.user_messages.RevokeClaimResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @static
             * @param {pesto.user_messages.IRevokeClaimResponse} message RevokeClaimResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RevokeClaimResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RevokeClaimResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.RevokeClaimResponse} RevokeClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RevokeClaimResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.RevokeClaimResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.successful = reader.bool();
                        break;
                    case 2:
                        message.claim = $root.pesto.models.Claim.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RevokeClaimResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.RevokeClaimResponse} RevokeClaimResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RevokeClaimResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RevokeClaimResponse message.
             * @function verify
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RevokeClaimResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.successful != null && message.hasOwnProperty("successful"))
                    if (typeof message.successful !== "boolean")
                        return "successful: boolean expected";
                if (message.claim != null && message.hasOwnProperty("claim")) {
                    var error = $root.pesto.models.Claim.verify(message.claim);
                    if (error)
                        return "claim." + error;
                }
                return null;
            };

            /**
             * Creates a RevokeClaimResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.RevokeClaimResponse} RevokeClaimResponse
             */
            RevokeClaimResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.RevokeClaimResponse)
                    return object;
                var message = new $root.pesto.user_messages.RevokeClaimResponse();
                if (object.successful != null)
                    message.successful = Boolean(object.successful);
                if (object.claim != null) {
                    if (typeof object.claim !== "object")
                        throw TypeError(".pesto.user_messages.RevokeClaimResponse.claim: object expected");
                    message.claim = $root.pesto.models.Claim.fromObject(object.claim);
                }
                return message;
            };

            /**
             * Creates a plain object from a RevokeClaimResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @static
             * @param {pesto.user_messages.RevokeClaimResponse} message RevokeClaimResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RevokeClaimResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.successful = false;
                    object.claim = null;
                }
                if (message.successful != null && message.hasOwnProperty("successful"))
                    object.successful = message.successful;
                if (message.claim != null && message.hasOwnProperty("claim"))
                    object.claim = $root.pesto.models.Claim.toObject(message.claim, options);
                return object;
            };

            /**
             * Converts this RevokeClaimResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.RevokeClaimResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RevokeClaimResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RevokeClaimResponse;
        })();

        user_messages.NoResponse = (function() {

            /**
             * Properties of a NoResponse.
             * @memberof pesto.user_messages
             * @interface INoResponse
             */

            /**
             * Constructs a new NoResponse.
             * @memberof pesto.user_messages
             * @classdesc Represents a NoResponse.
             * @implements INoResponse
             * @constructor
             * @param {pesto.user_messages.INoResponse=} [properties] Properties to set
             */
            function NoResponse(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new NoResponse instance using the specified properties.
             * @function create
             * @memberof pesto.user_messages.NoResponse
             * @static
             * @param {pesto.user_messages.INoResponse=} [properties] Properties to set
             * @returns {pesto.user_messages.NoResponse} NoResponse instance
             */
            NoResponse.create = function create(properties) {
                return new NoResponse(properties);
            };

            /**
             * Encodes the specified NoResponse message. Does not implicitly {@link pesto.user_messages.NoResponse.verify|verify} messages.
             * @function encode
             * @memberof pesto.user_messages.NoResponse
             * @static
             * @param {pesto.user_messages.INoResponse} message NoResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NoResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified NoResponse message, length delimited. Does not implicitly {@link pesto.user_messages.NoResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof pesto.user_messages.NoResponse
             * @static
             * @param {pesto.user_messages.INoResponse} message NoResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            NoResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a NoResponse message from the specified reader or buffer.
             * @function decode
             * @memberof pesto.user_messages.NoResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {pesto.user_messages.NoResponse} NoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NoResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pesto.user_messages.NoResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a NoResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof pesto.user_messages.NoResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {pesto.user_messages.NoResponse} NoResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            NoResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a NoResponse message.
             * @function verify
             * @memberof pesto.user_messages.NoResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            NoResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a NoResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof pesto.user_messages.NoResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {pesto.user_messages.NoResponse} NoResponse
             */
            NoResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.pesto.user_messages.NoResponse)
                    return object;
                return new $root.pesto.user_messages.NoResponse();
            };

            /**
             * Creates a plain object from a NoResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof pesto.user_messages.NoResponse
             * @static
             * @param {pesto.user_messages.NoResponse} message NoResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            NoResponse.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this NoResponse to JSON.
             * @function toJSON
             * @memberof pesto.user_messages.NoResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            NoResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return NoResponse;
        })();

        return user_messages;
    })();

    return pesto;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
