import React from "react";
import './home.css';

class Ranking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0 // Lưu chỉ số của mục đang active, bắt đầu từ mục đầu tiên (index 0)
        };
    }

    handleClick(index) {
        // Cập nhật trạng thái với chỉ số mục được click
        this.setState({ activeIndex: index });
    }

    render() {
        return (
            <div className="ranking">
                <p className="rank-title">BXH BÀI HÁT</p>
                <div className="rank-nav">
                    <div
                        className={`rank-nav-item item-1 ${this.state.activeIndex === 0 ? 'active' : ''}`}
                        onClick={() => this.handleClick(0)}
                    >
                        Việt Nam
                    </div>
                    <div
                        className={`rank-nav-item  ${this.state.activeIndex === 1 ? 'active' : ''}`}
                        onClick={() => this.handleClick(1)}
                    >
                        Âu Mỹ
                    </div>
                    <div
                        className={`rank-nav-item item-2 ${this.state.activeIndex === 2 ? 'active' : ''}`}
                        onClick={() => this.handleClick(2)}
                    >
                        Hàn Quốc
                    </div>
                </div>
                <div className="ranking-list">
                    {/* Hiển thị danh sách bảng xếp hạng dựa trên mục active */}
                </div>
            </div>
        );
    }
}

export default Ranking;
