// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payment_alias.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const PaymentAliasStateEnum _$paymentAliasStateEnum_ACTIVE =
    const PaymentAliasStateEnum._('ACTIVE');
const PaymentAliasStateEnum _$paymentAliasStateEnum_BLOCKED =
    const PaymentAliasStateEnum._('BLOCKED');
const PaymentAliasStateEnum _$paymentAliasStateEnum_REPLACED =
    const PaymentAliasStateEnum._('REPLACED');
const PaymentAliasStateEnum _$paymentAliasStateEnum_unknownDefaultOpenApi =
    const PaymentAliasStateEnum._('unknownDefaultOpenApi');

PaymentAliasStateEnum _$paymentAliasStateEnumValueOf(String name) {
  switch (name) {
    case 'ACTIVE':
      return _$paymentAliasStateEnum_ACTIVE;
    case 'BLOCKED':
      return _$paymentAliasStateEnum_BLOCKED;
    case 'REPLACED':
      return _$paymentAliasStateEnum_REPLACED;
    case 'unknownDefaultOpenApi':
      return _$paymentAliasStateEnum_unknownDefaultOpenApi;
    default:
      return _$paymentAliasStateEnum_unknownDefaultOpenApi;
  }
}

final BuiltSet<PaymentAliasStateEnum> _$paymentAliasStateEnumValues =
    BuiltSet<PaymentAliasStateEnum>(const <PaymentAliasStateEnum>[
  _$paymentAliasStateEnum_ACTIVE,
  _$paymentAliasStateEnum_BLOCKED,
  _$paymentAliasStateEnum_REPLACED,
  _$paymentAliasStateEnum_unknownDefaultOpenApi,
]);

Serializer<PaymentAliasStateEnum> _$paymentAliasStateEnumSerializer =
    _$PaymentAliasStateEnumSerializer();

class _$PaymentAliasStateEnumSerializer
    implements PrimitiveSerializer<PaymentAliasStateEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'ACTIVE': 'ACTIVE',
    'BLOCKED': 'BLOCKED',
    'REPLACED': 'REPLACED',
    'unknownDefaultOpenApi': 'unknown_default_open_api',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'ACTIVE': 'ACTIVE',
    'BLOCKED': 'BLOCKED',
    'REPLACED': 'REPLACED',
    'unknown_default_open_api': 'unknownDefaultOpenApi',
  };

  @override
  final Iterable<Type> types = const <Type>[PaymentAliasStateEnum];
  @override
  final String wireName = 'PaymentAliasStateEnum';

  @override
  Object serialize(Serializers serializers, PaymentAliasStateEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  PaymentAliasStateEnum deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      PaymentAliasStateEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$PaymentAlias extends PaymentAlias {
  @override
  final String id;
  @override
  final String qrPayload;
  @override
  final PaymentAliasStateEnum state;

  factory _$PaymentAlias([void Function(PaymentAliasBuilder)? updates]) =>
      (PaymentAliasBuilder()..update(updates))._build();

  _$PaymentAlias._(
      {required this.id, required this.qrPayload, required this.state})
      : super._();
  @override
  PaymentAlias rebuild(void Function(PaymentAliasBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentAliasBuilder toBuilder() => PaymentAliasBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentAlias &&
        id == other.id &&
        qrPayload == other.qrPayload &&
        state == other.state;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, qrPayload.hashCode);
    _$hash = $jc(_$hash, state.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentAlias')
          ..add('id', id)
          ..add('qrPayload', qrPayload)
          ..add('state', state))
        .toString();
  }
}

class PaymentAliasBuilder
    implements Builder<PaymentAlias, PaymentAliasBuilder> {
  _$PaymentAlias? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _qrPayload;
  String? get qrPayload => _$this._qrPayload;
  set qrPayload(String? qrPayload) => _$this._qrPayload = qrPayload;

  PaymentAliasStateEnum? _state;
  PaymentAliasStateEnum? get state => _$this._state;
  set state(PaymentAliasStateEnum? state) => _$this._state = state;

  PaymentAliasBuilder() {
    PaymentAlias._defaults(this);
  }

  PaymentAliasBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _qrPayload = $v.qrPayload;
      _state = $v.state;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentAlias other) {
    _$v = other as _$PaymentAlias;
  }

  @override
  void update(void Function(PaymentAliasBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentAlias build() => _build();

  _$PaymentAlias _build() {
    final _$result = _$v ??
        _$PaymentAlias._(
          id: BuiltValueNullFieldError.checkNotNull(id, r'PaymentAlias', 'id'),
          qrPayload: BuiltValueNullFieldError.checkNotNull(
              qrPayload, r'PaymentAlias', 'qrPayload'),
          state: BuiltValueNullFieldError.checkNotNull(
              state, r'PaymentAlias', 'state'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
