// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'settlement_batch.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const SettlementBatchStateEnum _$settlementBatchStateEnum_OPEN =
    const SettlementBatchStateEnum._('OPEN');
const SettlementBatchStateEnum _$settlementBatchStateEnum_CLOSED =
    const SettlementBatchStateEnum._('CLOSED');
const SettlementBatchStateEnum _$settlementBatchStateEnum_AVAILABLE =
    const SettlementBatchStateEnum._('AVAILABLE');
const SettlementBatchStateEnum _$settlementBatchStateEnum_FAILED =
    const SettlementBatchStateEnum._('FAILED');
const SettlementBatchStateEnum
    _$settlementBatchStateEnum_unknownDefaultOpenApi =
    const SettlementBatchStateEnum._('unknownDefaultOpenApi');

SettlementBatchStateEnum _$settlementBatchStateEnumValueOf(String name) {
  switch (name) {
    case 'OPEN':
      return _$settlementBatchStateEnum_OPEN;
    case 'CLOSED':
      return _$settlementBatchStateEnum_CLOSED;
    case 'AVAILABLE':
      return _$settlementBatchStateEnum_AVAILABLE;
    case 'FAILED':
      return _$settlementBatchStateEnum_FAILED;
    case 'unknownDefaultOpenApi':
      return _$settlementBatchStateEnum_unknownDefaultOpenApi;
    default:
      return _$settlementBatchStateEnum_unknownDefaultOpenApi;
  }
}

final BuiltSet<SettlementBatchStateEnum> _$settlementBatchStateEnumValues =
    BuiltSet<SettlementBatchStateEnum>(const <SettlementBatchStateEnum>[
  _$settlementBatchStateEnum_OPEN,
  _$settlementBatchStateEnum_CLOSED,
  _$settlementBatchStateEnum_AVAILABLE,
  _$settlementBatchStateEnum_FAILED,
  _$settlementBatchStateEnum_unknownDefaultOpenApi,
]);

Serializer<SettlementBatchStateEnum> _$settlementBatchStateEnumSerializer =
    _$SettlementBatchStateEnumSerializer();

class _$SettlementBatchStateEnumSerializer
    implements PrimitiveSerializer<SettlementBatchStateEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'OPEN': 'OPEN',
    'CLOSED': 'CLOSED',
    'AVAILABLE': 'AVAILABLE',
    'FAILED': 'FAILED',
    'unknownDefaultOpenApi': 'unknown_default_open_api',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'OPEN': 'OPEN',
    'CLOSED': 'CLOSED',
    'AVAILABLE': 'AVAILABLE',
    'FAILED': 'FAILED',
    'unknown_default_open_api': 'unknownDefaultOpenApi',
  };

  @override
  final Iterable<Type> types = const <Type>[SettlementBatchStateEnum];
  @override
  final String wireName = 'SettlementBatchStateEnum';

  @override
  Object serialize(Serializers serializers, SettlementBatchStateEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  SettlementBatchStateEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      SettlementBatchStateEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$SettlementBatch extends SettlementBatch {
  @override
  final String id;
  @override
  final SettlementBatchStateEnum state;
  @override
  final int amountMinor;
  @override
  final DateTime availableAt;

  factory _$SettlementBatch([void Function(SettlementBatchBuilder)? updates]) =>
      (SettlementBatchBuilder()..update(updates))._build();

  _$SettlementBatch._(
      {required this.id,
      required this.state,
      required this.amountMinor,
      required this.availableAt})
      : super._();
  @override
  SettlementBatch rebuild(void Function(SettlementBatchBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SettlementBatchBuilder toBuilder() => SettlementBatchBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SettlementBatch &&
        id == other.id &&
        state == other.state &&
        amountMinor == other.amountMinor &&
        availableAt == other.availableAt;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, state.hashCode);
    _$hash = $jc(_$hash, amountMinor.hashCode);
    _$hash = $jc(_$hash, availableAt.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SettlementBatch')
          ..add('id', id)
          ..add('state', state)
          ..add('amountMinor', amountMinor)
          ..add('availableAt', availableAt))
        .toString();
  }
}

class SettlementBatchBuilder
    implements Builder<SettlementBatch, SettlementBatchBuilder> {
  _$SettlementBatch? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  SettlementBatchStateEnum? _state;
  SettlementBatchStateEnum? get state => _$this._state;
  set state(SettlementBatchStateEnum? state) => _$this._state = state;

  int? _amountMinor;
  int? get amountMinor => _$this._amountMinor;
  set amountMinor(int? amountMinor) => _$this._amountMinor = amountMinor;

  DateTime? _availableAt;
  DateTime? get availableAt => _$this._availableAt;
  set availableAt(DateTime? availableAt) => _$this._availableAt = availableAt;

  SettlementBatchBuilder() {
    SettlementBatch._defaults(this);
  }

  SettlementBatchBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _state = $v.state;
      _amountMinor = $v.amountMinor;
      _availableAt = $v.availableAt;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SettlementBatch other) {
    _$v = other as _$SettlementBatch;
  }

  @override
  void update(void Function(SettlementBatchBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SettlementBatch build() => _build();

  _$SettlementBatch _build() {
    final _$result = _$v ??
        _$SettlementBatch._(
          id: BuiltValueNullFieldError.checkNotNull(
              id, r'SettlementBatch', 'id'),
          state: BuiltValueNullFieldError.checkNotNull(
              state, r'SettlementBatch', 'state'),
          amountMinor: BuiltValueNullFieldError.checkNotNull(
              amountMinor, r'SettlementBatch', 'amountMinor'),
          availableAt: BuiltValueNullFieldError.checkNotNull(
              availableAt, r'SettlementBatch', 'availableAt'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
