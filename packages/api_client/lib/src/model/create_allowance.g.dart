// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_allowance.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$CreateAllowance extends CreateAllowance {
  @override
  final String collectorId;
  @override
  final int amountMinor;

  factory _$CreateAllowance([void Function(CreateAllowanceBuilder)? updates]) =>
      (CreateAllowanceBuilder()..update(updates))._build();

  _$CreateAllowance._({required this.collectorId, required this.amountMinor})
      : super._();
  @override
  CreateAllowance rebuild(void Function(CreateAllowanceBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  CreateAllowanceBuilder toBuilder() => CreateAllowanceBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is CreateAllowance &&
        collectorId == other.collectorId &&
        amountMinor == other.amountMinor;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, collectorId.hashCode);
    _$hash = $jc(_$hash, amountMinor.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'CreateAllowance')
          ..add('collectorId', collectorId)
          ..add('amountMinor', amountMinor))
        .toString();
  }
}

class CreateAllowanceBuilder
    implements Builder<CreateAllowance, CreateAllowanceBuilder> {
  _$CreateAllowance? _$v;

  String? _collectorId;
  String? get collectorId => _$this._collectorId;
  set collectorId(String? collectorId) => _$this._collectorId = collectorId;

  int? _amountMinor;
  int? get amountMinor => _$this._amountMinor;
  set amountMinor(int? amountMinor) => _$this._amountMinor = amountMinor;

  CreateAllowanceBuilder() {
    CreateAllowance._defaults(this);
  }

  CreateAllowanceBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _collectorId = $v.collectorId;
      _amountMinor = $v.amountMinor;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CreateAllowance other) {
    _$v = other as _$CreateAllowance;
  }

  @override
  void update(void Function(CreateAllowanceBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  CreateAllowance build() => _build();

  _$CreateAllowance _build() {
    final _$result = _$v ??
        _$CreateAllowance._(
          collectorId: BuiltValueNullFieldError.checkNotNull(
              collectorId, r'CreateAllowance', 'collectorId'),
          amountMinor: BuiltValueNullFieldError.checkNotNull(
              amountMinor, r'CreateAllowance', 'amountMinor'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
