// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'owner_overview.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$OwnerOverview extends OwnerOverview {
  @override
  final Money verifiedRevenue;
  @override
  final Money pending;
  @override
  final Money available;
  @override
  final Money operatingReserved;
  @override
  final DateTime nextSettlementAt;

  factory _$OwnerOverview([void Function(OwnerOverviewBuilder)? updates]) =>
      (OwnerOverviewBuilder()..update(updates))._build();

  _$OwnerOverview._(
      {required this.verifiedRevenue,
      required this.pending,
      required this.available,
      required this.operatingReserved,
      required this.nextSettlementAt})
      : super._();
  @override
  OwnerOverview rebuild(void Function(OwnerOverviewBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  OwnerOverviewBuilder toBuilder() => OwnerOverviewBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is OwnerOverview &&
        verifiedRevenue == other.verifiedRevenue &&
        pending == other.pending &&
        available == other.available &&
        operatingReserved == other.operatingReserved &&
        nextSettlementAt == other.nextSettlementAt;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, verifiedRevenue.hashCode);
    _$hash = $jc(_$hash, pending.hashCode);
    _$hash = $jc(_$hash, available.hashCode);
    _$hash = $jc(_$hash, operatingReserved.hashCode);
    _$hash = $jc(_$hash, nextSettlementAt.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'OwnerOverview')
          ..add('verifiedRevenue', verifiedRevenue)
          ..add('pending', pending)
          ..add('available', available)
          ..add('operatingReserved', operatingReserved)
          ..add('nextSettlementAt', nextSettlementAt))
        .toString();
  }
}

class OwnerOverviewBuilder
    implements Builder<OwnerOverview, OwnerOverviewBuilder> {
  _$OwnerOverview? _$v;

  MoneyBuilder? _verifiedRevenue;
  MoneyBuilder get verifiedRevenue =>
      _$this._verifiedRevenue ??= MoneyBuilder();
  set verifiedRevenue(MoneyBuilder? verifiedRevenue) =>
      _$this._verifiedRevenue = verifiedRevenue;

  MoneyBuilder? _pending;
  MoneyBuilder get pending => _$this._pending ??= MoneyBuilder();
  set pending(MoneyBuilder? pending) => _$this._pending = pending;

  MoneyBuilder? _available;
  MoneyBuilder get available => _$this._available ??= MoneyBuilder();
  set available(MoneyBuilder? available) => _$this._available = available;

  MoneyBuilder? _operatingReserved;
  MoneyBuilder get operatingReserved =>
      _$this._operatingReserved ??= MoneyBuilder();
  set operatingReserved(MoneyBuilder? operatingReserved) =>
      _$this._operatingReserved = operatingReserved;

  DateTime? _nextSettlementAt;
  DateTime? get nextSettlementAt => _$this._nextSettlementAt;
  set nextSettlementAt(DateTime? nextSettlementAt) =>
      _$this._nextSettlementAt = nextSettlementAt;

  OwnerOverviewBuilder() {
    OwnerOverview._defaults(this);
  }

  OwnerOverviewBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _verifiedRevenue = $v.verifiedRevenue.toBuilder();
      _pending = $v.pending.toBuilder();
      _available = $v.available.toBuilder();
      _operatingReserved = $v.operatingReserved.toBuilder();
      _nextSettlementAt = $v.nextSettlementAt;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OwnerOverview other) {
    _$v = other as _$OwnerOverview;
  }

  @override
  void update(void Function(OwnerOverviewBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  OwnerOverview build() => _build();

  _$OwnerOverview _build() {
    _$OwnerOverview _$result;
    try {
      _$result = _$v ??
          _$OwnerOverview._(
            verifiedRevenue: verifiedRevenue.build(),
            pending: pending.build(),
            available: available.build(),
            operatingReserved: operatingReserved.build(),
            nextSettlementAt: BuiltValueNullFieldError.checkNotNull(
                nextSettlementAt, r'OwnerOverview', 'nextSettlementAt'),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'verifiedRevenue';
        verifiedRevenue.build();
        _$failedField = 'pending';
        pending.build();
        _$failedField = 'available';
        available.build();
        _$failedField = 'operatingReserved';
        operatingReserved.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'OwnerOverview', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
