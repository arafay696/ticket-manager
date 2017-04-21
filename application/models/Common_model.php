<?php if (!defined('BASEPATH')) exit ('No direct script  allow');


class Common_model extends CI_Model
{


    function select_all($select, $table)

    {

        $this->db->select($select);

        $this->db->from($table);

        return $this->db->get();

    }


    function select_where_three($select, $table, $where1, $where2, $where3)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where1);

        $this->db->where($where2);

        $this->db->where($where3);

        return $this->db->get();

    }


    function select_where_four($select, $table, $where1, $where2, $where3, $where4)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where1);

        $this->db->where($where2);

        $this->db->where($where3);

        $this->db->where($where4);

        return $this->db->get();

    }


    function select_where_two($select, $table, $where1, $where2)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where1);

        $this->db->where($where2);

        return $this->db->get();

    }


    function select_groupby($select, $table, $where, $groupby)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->group_by($groupby);

        return $this->db->get();

    }


    function select_where_in($select, $table, $where_in, $in_fld)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where_in($in_fld, $where_in);

        $this->db->group_by($select);

        return $this->db->get();

    }

    function select_where_in_simple($select, $table, $where_in, $where = '', $in_fld)

    {

        $this->db->select($select);

        $this->db->from($table);
        if ($where != '') {
            $this->db->where($where);
        }

        $this->db->where_in($in_fld, $where_in);

        return $this->db->get();

    }


    function select_single_field($select, $table, $where)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $qry = $this->db->get();
        if ($qry->num_rows() > 0) {
            $rr = @$qry->row_array();
            return @$rr[$select];
        } else {
            return "";
        }

    }


    function select_limit_where_simple($select, $table, $where, $recordperpage)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->limit($recordperpage);

        $result = $this->db->get();

        return $result;

    }


    function select_limit_order($select, $table, $page, $recordperpage, $orderBy_columName, $ASC_DESC)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->limit($recordperpage, $page);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        $result = $this->db->get();

        return $result;


    }


    function select_where_order($select, $table, $orderBy_columName, $ASC_DESC)
    {
        $this->db->select($select);
        $this->db->from($table);
        $this->db->order_by($orderBy_columName, $ASC_DESC);
        $result = $this->db->get();
        return $result;
    }


    function select_limit($select, $table, $page, $recordperpage)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->limit($recordperpage, $page);

        $result = $this->db->get();

        return $result;


    }


    function select_table_rows($select, $table)

    {

        $this->db->select($select);

        $this->db->from($table);

        $query = $this->db->get();

        return $query->num_rows();

    }


    function join_two_tab_where_numrow($select, $from, $jointable, $condition, $where)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        $query = $this->db->get();

        return $query->num_rows();


    }


    function select_or_like($select, $table, $where, $orcondition, $recordperpage, $page, $orderBy_columName, $ASC_DESC)
    {

        $this->db->select($select);

        $this->db->from($table);

        //$this->db->like( $like );

        $this->db->or_like($orcondition);

        $this->db->where($where);

        $this->db->limit($recordperpage, $page);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();


    }


    function select_or_like_rows($select, $table, $where, $orcondition)
    {

        $this->db->select($select);

        $this->db->from($table);

        //$this->db->like( $like );

        $this->db->or_like($orcondition);

        $this->db->where($where);

        $query = $this->db->get();

        return $query->num_rows();


    }


    function join_tab_where($select, $from, $jointab, $condition, $where, $orderBy_columName, $ASC_DESC)
    {


        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointab, $condition, 'left');

        $this->db->where($where);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();

    }

    function join_tab_where_order_group($select, $from, $jointab, $condition, $where, $orderBy_columName, $ASC_DESC, $group_by)
    {


        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointab, $condition, 'left');

        $this->db->where($where);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        $this->db->group_by($group_by);

        return $this->db->get();

    }


    function select_where_like($select, $table, $where_con, $where, $limit)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where_con);

        $this->db->like($where);

        $this->db->limit($limit);

        return $this->db->get();

    }


    function join_three_tab_where($select, $from, $jointable1, $condition1, $jointable2, $condition2, $where, $recordperpage, $page, $orderBy_columName, $ASC_DESC)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable1, $condition1);

        $this->db->join($jointable2, $condition2);

        $this->db->where($where);

        $this->db->limit($recordperpage, $page);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();


    }


    function join_three_tab_where_rows($select, $from, $jointable1, $condition1, $jointable2, $condition2, $where)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable1, $condition1);

        $this->db->join($jointable2, $condition2);

        $this->db->where($where);

        $query = $this->db->get();

        return $query->num_rows();

    }

    function join_three_tab_where_simple($select, $from, $jointable1, $condition1, $jointable2, $condition2, $where)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable1, $condition1);

        $this->db->join($jointable2, $condition2);

        $this->db->where($where);

        $query = $this->db->get();

        return $query;

    }


    function select_limit_by($select, $table, $where, $page, $recordperpage, $orderBy_columName, $ASC_DESC)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->limit($recordperpage, $page);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        $result = $this->db->get();

        return $result;


    }


    function join_two_tab_where_numrows($select, $from, $jointable, $condition, $where)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        return $this->db->get();


    }


    function select_limit_where($select, $table, $where, $page, $recordperpage)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->limit($recordperpage, $page);

        $result = $this->db->get();

        return $result;


    }


    function join_two_tab_where_limit($select, $from, $jointable, $condition, $where, $page, $recordperpage)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        $this->db->limit($recordperpage, $page);

        $query = $this->db->get();

        return $query;

    }


    function join_two_tab_where_numrw($select, $from, $jointable, $condition, $where)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        $query = $this->db->get();

        return $query->num_rows();

    }


    function join_two_tab_where_simple($select, $from, $jointable, $condition, $where)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        $query = $this->db->get();

        return $query;

    }


    function join_two_tab_where_simple_group($select, $from, $jointable, $condition, $where, $group_by)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        $this->db->group_by($group_by);

        $query = $this->db->get();

        return $query;


    }


    function left_join_two_tab_where_simple($select, $from, $jointable, $condition, $where)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition, 'left');

        $this->db->where($where);

        $query = $this->db->get();

        return $query;

    }


    function join_two_tab_where_groupby($select, $from, $jointable, $condition, $where, $group_by)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        $this->db->group_by($group_by);

        $query = $this->db->get();

        return $query;

    }


    function select_limit_order_where($select, $table, $where, $page, $recordperpage, $orderBy_columName, $ASC_DESC)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->limit($recordperpage, $page);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        $result = $this->db->get();

        return $result;


    }


////    function added by muhammad raheel


    function select_where($select, $table, $where)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        return $this->db->get();

    }


    function select_ASC_DESC($select, $table, $orderBy_columName, $ASC_DESC)

    {


        //echo $orderBy_columName.">>>.".$ASC_DESC;

        $this->db->select($select);

        $this->db->from($table);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        $result = $this->db->get();

        return $result;

    }


    function update_array($where, $table, $data)

    {

        $this->db->where($where);

        $query = $this->db->update($table, $data);
        return $query;

    }


    function select_where_ASC_DESC($select, $table, $where, $orderBy_columName, $ASC_DESC)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        $result = $this->db->get();

        return $result;


    }


    function join_two_tab($select, $from, $jointab, $condition, $orderBy_columName, $ASC_DESC)
    {


        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointab, $condition);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();


    }


    function join_two_tab_where2($select, $from, $jointable, $condition, $where, $recordperpage, $page, $orderBy_columName, $ASC_DESC)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        $this->db->limit($recordperpage, $page);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();


    }

    function join_two_tab_wheree($select, $from, $jointable, $condition, $where, $orderBy_columName, $ASC_DESC)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable, $condition);

        $this->db->where($where);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();


    }


    function join_3where($select, $from, $jointable1, $condition1, $jointable2, $condition2, $where, $orderBy_columName, $ASC_DESC)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointable1, $condition1);

        $this->db->join($jointable2, $condition2);

        $this->db->where($where);


        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();

    }

    function incrementLog($logName = null, $logDescription = null, $logType = 1, $ref_id)
    {

        /*$totalLogs = 0;
        $getSum = $this->db->query("select sum(l.log_type) as totalLogs from logs as l WHERE l.log_type = $logType");
        $getSum = $getSum->result_array();
        if($getSum > 0){
            $totalLogs = $getSum[0]['totalLogs'];
            if($totalLogs >= 10){
                //$deleteRecord = $this->db->query("delete from logs as l order by l.date_updatedlogs DESC limit 1");
                $deleteRecord = $this->db->query("DELETE FROM logs WHERE log_type = $logType ORDER BY id DESC LIMIT 1");
            }
        }*/

        $data = array('status' => 0, 'msg' => '');
        $dataLogs = array(
            'log_name' => $logName,
            'ref_id' => $ref_id,
            'log_description' => $logDescription,
            'log_type' => $logType,
            'count' => 0,
            'date_added' => date('Y-m-d H:i:s'),
            'date_updated' => date('Y-m-d H:i:s'),
            'company_id' => (isset($_SESSION['user_company_id'])) ? $_SESSION['user_company_id'] : 18
        );
        $addLog = $this->common_model->insert_array('logs', $dataLogs);

        if ($addLog) {
            $data['status'] = 1;
            $data['msg'] = 'log added successfully';
        } else {
            $data['status'] = 0;
            $data['msg'] = 'log added fail';
        }

        return $data;
    }

    function addCampaignOutputs($logName = null, $logDescription = null, $logType = 1, $ref_id)
    {

        $dataLogs = array(
            'log_name' => $logName,
            'ref_id' => $ref_id,
            'log_description' => $logDescription,
            'log_type' => $logType,
            'count' => 0,
            'date_added' => date('Y-m-d H:i:s'),
            'date_updated' => date('Y-m-d H:i:s')
        );
        $addLog = $this->common_model->insert_array('logs', $dataLogs);

        if ($addLog) {
            $data['status'] = 1;
            $data['msg'] = 'log added successfully';
        } else {
            $data['status'] = 0;
            $data['msg'] = 'log added fail';
        }

        return $data;
    }

    function insert_array($table, $data)

    {

        $this->db->insert($table, $data);

        return $this->db->insert_id();

    }

    function insert_batch($table, $data)

    {

        $this->db->insert_batch($table, $data);

        return $this->db->insert_id();

    }


    function select_where_table_rows($select, $table, $where)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $query = $this->db->get();

        return $query->num_rows();

    }


    function like_search($select, $table, $like, $recordperpage, $page, $orderBy_columName, $ASC_DESC)
    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->like($like);

        $this->db->limit($recordperpage, $page);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();


    }


    function like_search_1($select, $table, $like, $recordperpage1, $page1, $orderBy_columName, $ASC_DESC)
    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->like($like);

        $this->db->limit($recordperpage1, $page1);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        return $this->db->get();


    }

    function like_search_rows($select, $table, $like)
    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->like($like);

        $query = $this->db->get();

        return $query;

    }


    function like_search_rows_after($select, $table, $title, $match, $place)
    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->like($title, $match, $place);

        $query = $this->db->get();

        return $query;

    }


    function delete_where($where, $tbl_name)
    {

        $this->db->where($where);

        return $this->db->delete($tbl_name);
    }

    function truncate_table($tbl_name)
    {

        $this->db->truncate($tbl_name);

    }


    function editt($where, $table, $data)

    {

        $this->db->where($where);

        $q = $this->db->update($table, $data);


        if ($q) {


            return true;


        }

    }


    function join_two_tab_where_result($select, $from, $jointable, $condition, $where)
    {


        $this->db->select($select);


        $this->db->from($from);


        $this->db->join($jointable, $condition);


        $this->db->where($where);


        return $this->db->get();


    }


    function select_where_limit_order($select, $table, $where, $page, $recordperpage, $orderBy_columName, $ASC_DESC)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->limit($recordperpage, $page);

        $this->db->order_by($orderBy_columName, $ASC_DESC);

        $result = $this->db->get();

        return $result;


    }


    function select_table_rows_where($select, $table, $where)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $query = $this->db->get();

        return $query->num_rows();

    }


    function select_sum($column, $table, $where)
    {

        $query = $this->db->select_sum($column);

        $this->db->from($table);

        $this->db->where($where);

        $query = $this->db->get();

        return $query->row_array();

    }


    function wordpress_user_id($email)

    {

        $this->db->select('ID');

        $this->db->from('wp_users');

        $this->db->where('user_email', $email);

        $query1 = @$this->db->get();

        if ($query1->num_rows() > 0) {

            $row = $query1->row_array();

            return $row['ID'];

        } else {

            return '';

        }

    }


    function update_wordpress($data, $id)

    {

        $this->db->where('ID', $id);

        $this->db->update('wp_users', $data);

    }


    function select_distinct()

    {

        $mysql = "SELECT DISTINCT prel_year FROM press_release WHERE status =1";

        return $this->db->query($mysql);

    }


    function select_groupby_ASC_DESC($select, $table, $where, $groupby, $odrField, $ASC_DESC)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->group_by($groupby);

        $this->db->order_by($odrField, $ASC_DESC);

        return $this->db->get();

    }


    function query($query)

    {

        return $this->db->query($query);

    }


    function moveup_press($sid)

    {

        $query1 = "select displaypriority from press_release where prel_id =" . $sid;

        $result1 = $this->db->query($query1);

        if ($result1->num_rows() > 0) {

            $row1 = $result1->row();

            $maxpriority = $row1->displaypriority;

        }

        $query2 = "select displaypriority,prel_id from press_release where prel_id!=" . $sid . " and displaypriority<" . $maxpriority . " order by displaypriority desc";

        $result2 = $this->db->query($query2);

        if ($result2->num_rows() > 0) {

            $row2 = $result2->row();

            $minpriority = $row2->displaypriority;

            $min_id = $row2->prel_id;

        } else {

            $minpriority = 0;

            $min_id = 0;

        }


        $update1 = "update press_release set displaypriority=" . $minpriority . " where prel_id=" . $sid;

        $this->db->query($update1);

        $update2 = "update press_release set displaypriority=" . $maxpriority . " where prel_id=" . $min_id;

        $this->db->query($update2);

    }


    function movedown_press($sid)

    {

        $query1 = "select displaypriority from press_release where prel_id=" . $sid;

        $result1 = $this->db->query($query1);

        if ($result1->num_rows() > 0) {

            $row1 = $result1->row();

            $minpriorty = $row1->displaypriority;

        }

        $query2 = "select displaypriority,prel_id from press_release where prel_id!=" . $sid . " and displaypriority>" . $minpriorty . " order by displaypriority asc";

        $result2 = $this->db->query($query2);

        if ($result2->num_rows() > 0) {

            $row2 = $result2->row();

            $maxpriority = $row2->displaypriority;

            $max_id = $row2->prel_id;

        } else {

            $maxpriority = 0;

            $max_id = 0;

        }


        $update1 = "update press_release set displaypriority=" . $maxpriority . " where prel_id=" . $sid;

        $this->db->query($update1);

        $update2 = "update press_release set displaypriority=" . $minpriorty . " where prel_id=" . $max_id;

        $this->db->query($update2);

    }


    function moveup_worksheet_manual($wid)

    {

        $query1 = "select displaypriority from worksheets_manuals where wm_id 	=" . $wid;

        $result1 = $this->db->query($query1);

        if ($result1->num_rows() > 0) {

            $row1 = $result1->row();

            $maxpriority = $row1->displaypriority;

        }

        $query2 = "select displaypriority,wm_id  from worksheets_manuals where wm_id!=" . $wid . " and displaypriority<" . $maxpriority . " order by displaypriority desc";

        $result2 = $this->db->query($query2);

        if ($result2->num_rows() > 0) {

            $row2 = $result2->row();

            $minpriority = $row2->displaypriority;

            $min_id = $row2->wm_id;

        } else {

            $minpriority = 0;

            $min_id = 0;

        }


        $update1 = "update worksheets_manuals set displaypriority=" . $minpriority . " where wm_id=" . $wid;

        $this->db->query($update1);

        $update2 = "update worksheets_manuals set displaypriority=" . $maxpriority . " where wm_id=" . $min_id;

        $this->db->query($update2);

    }


    function movedown_slider_manual($wid)

    {

        $query1 = "select displaypriority from worksheets_manuals where wm_id=" . $wid;

        $result1 = $this->db->query($query1);

        if ($result1->num_rows() > 0) {

            $row1 = $result1->row();

            $minpriorty = $row1->displaypriority;

        }

        $query2 = "select displaypriority,wm_id from worksheets_manuals where wm_id!=" . $wid . " and displaypriority>" . $minpriorty . " order by displaypriority asc";

        $result2 = $this->db->query($query2);

        if ($result2->num_rows() > 0) {

            $row2 = $result2->row();

            $maxpriority = $row2->displaypriority;

            $max_id = $row2->wm_id;

        } else {

            $maxpriority = 0;

            $max_id = 0;

        }


        $update1 = "update worksheets_manuals set displaypriority=" . $maxpriority . " where wm_id=" . $wid;

        $this->db->query($update1);

        $update2 = "update worksheets_manuals set displaypriority=" . $minpriorty . " where wm_id=" . $max_id;

        $this->db->query($update2);

    }


    function moveup_worksheet_pdf($wid, $mid, $gid)

    {

        $query1 = "select displaypriority from worksheets where wid =" . $wid . " and manual_id = " . $mid . " and grade_id = " . $gid . "";

        $result1 = $this->db->query($query1);

        if ($result1->num_rows() > 0) {

            $row1 = $result1->row();

            $maxpriority = $row1->displaypriority;

        }

        $query2 = "select displaypriority,wid  from worksheets where wid!=" . $wid . " and manual_id = " . $mid . " and grade_id = " . $gid . " and displaypriority<" . $maxpriority . " order by displaypriority desc";

        $result2 = $this->db->query($query2);

        if ($result2->num_rows() > 0) {

            $row2 = $result2->row();

            $minpriority = $row2->displaypriority;

            $min_id = $row2->wid;

        } else {

            $minpriority = 0;

            $min_id = 0;

        }


        $update1 = "update worksheets set displaypriority=" . $minpriority . " where wid=" . $wid . " and manual_id = " . $mid . " and grade_id = " . $gid . "";

        $this->db->query($update1);

        $update2 = "update worksheets set displaypriority=" . $maxpriority . " where wid=" . $min_id . " and manual_id = " . $mid . " and grade_id = " . $gid . "";

        $this->db->query($update2);

    }


    function movedown_worksheet_pdf($wid, $mid, $gid)

    {

        $query1 = "select displaypriority from worksheets where wid=" . $wid . " and manual_id = " . $mid . " and grade_id = " . $gid . "";

        $result1 = $this->db->query($query1);

        if ($result1->num_rows() > 0) {

            $row1 = $result1->row();

            $minpriorty = $row1->displaypriority;

        }

        $query2 = "select displaypriority,wid from worksheets where wid!=" . $wid . " and manual_id = " . $mid . " and grade_id = " . $gid . " and displaypriority>" . $minpriorty . " order by displaypriority asc";

        $result2 = $this->db->query($query2);

        if ($result2->num_rows() > 0) {

            $row2 = $result2->row();

            $maxpriority = $row2->displaypriority;

            $max_id = $row2->wid;

        } else {

            $maxpriority = 0;

            $max_id = 0;

        }


        $update1 = "update worksheets set displaypriority=" . $maxpriority . " where wid=" . $wid . " and manual_id = " . $mid . " and grade_id = " . $gid . "";

        $this->db->query($update1);

        $update2 = "update worksheets set displaypriority=" . $minpriorty . " where wid=" . $max_id . " and manual_id = " . $mid . " and grade_id = " . $gid . "";

        $this->db->query($update2);

    }


    //Custom Functions

    function delete_two_join_table($table1, $table2, $condition, $where)
    {

        $this->db->query("DELETE a.*, b.* FROM $table1 a

						  LEFT JOIN $table2 b

						  ON $condition

						  WHERE $where");

        return TRUE;

    }

    //---- Function for join Records ---//
    public function get_joined_records($pTable, $columns, $joins, $where = '', $limit, $start, $keyword, $order_by, $group_by = '')
    {
        $this->db->limit(($limit - 1) * $start, $limit);

        if ($keyword) {

            $this->db->like($keyword, $keyword);

            $this->db->or_like($keyword, $keyword);

        }

        if ($order_by != '') {

            $this->db->order_by($order_by);

        }
        if ($group_by != '') {
            $this->db->group_by($group_by);
        }

        $this->db->select($columns);

        if ($joins != '') {
            foreach ($joins as $join) {
                $this->db->join($join['table'], $join['condition'], $join['joinType']);
            }
        }
        if ($where != '') {
            $this->db->where($where);
        }
        $query = $this->db->get($pTable)->result();

        return $query;
    }


    //---  function for deleting records  ---//
    public function delete_records($table, $where = '')
    {
        if ($where != '')
            $this->db->where($where);
        $this->db->delete($table);
        $affectedRows = $this->db->affected_rows();
        if ($affectedRows) {
            return true;
        } else {
            return false;
        }
    }//---  End of function delete_records  ---//


    function select_data_where($data, $table, $where)
    {
        $this->db->where($where);
        $this->db->select($data);
        $query = $this->db->get($table);
        return $query;

    }

    public function joined_records($pTable, $columns, $joins, $where = '', $limit, $start, $keyword, $order_by = '', $group_by = '')
    {
        if ($limit != '') {
            $this->db->limit(($limit - 1) * $start, $limit);
        }
        if ($keyword) {

            $this->db->like($keyword, $keyword);

            $this->db->or_like($keyword, $keyword);

        }

        if ($order_by != '') {

            $this->db->order_by($order_by);

        }
        if ($group_by != '') {
            $this->db->group_by($group_by);
        }

        $this->db->select($columns);

        if ($joins != '') {
            foreach ($joins as $join) {
                $this->db->join($join['table'], $join['condition'], $join['joinType']);
            }
        }
        if ($where != '') {
            $this->db->where($where);
        }
        $query = $this->db->get($pTable);
        //$query = $this->db->last_query();
        return $query;
    }//--- ENd of get_joined_records(); ---//

    function select_single_field_data($select, $table, $where)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $qry = $this->db->get();
        $result = $qry->result_array();
        return $result;

    }

    function update_data($where, $table, $data)
    {
        $this->db->where($where);
        $this->db->update($table, $data);
        $this->db->trans_complete();
        $this->db->affected_rows();
        if ($this->db->affected_rows() > 0) {
            return true;
        }

        //return false;
        return $this->db->last_query();
    }

    function delete_data($where, $tbl_name)
    {
        $this->db->where($where);
        $this->db->delete($tbl_name);
        $this->db->trans_complete();
        $this->db->affected_rows();
        if ($this->db->affected_rows() == '1') {
            return TRUE;
        }

        return false;
    }

    function join_tab_where_simple($select, $from, $jointab, $condition)
    {

        $this->db->select($select);

        $this->db->from($from);

        $this->db->join($jointab, $condition);

        return $this->db->get();

    }

    public function form_views_submission($scenario_id, $form_action)
    {
        $this->db->select("COUNT(DISTINCT campaign_output_log.camp_log_id) as total_views, COUNT(DISTINCT submitted_forms.id) as total_submitted");
        $this->db->join("submitted_forms", "submitted_forms.scenario_id = campaign_output_log.camp_output_id");
        $this->db->where("campaign_output_log.camp_output_id", $scenario_id);
        $this->db->where("campaign_output_log.is_view", 1);
        return $this->db->get("campaign_output_log")->result();
    }


    public function get_submitted_forms($scenario_id)
    {
        $this->db->select("form_data");
        $this->db->where("scenario_id", $scenario_id);
        return $this->db->get("submitted_forms")->result();
    }

    public function campaign_report($id)
    {
        $this->db->select("col.campaign_id,c.title,SUM(col.is_view) AS TotalViews,COUNT(DISTINCT col.camp_log_id) AS TotalSend,col.output_field");
        $this->db->from("campaigns AS c");
        $this->db->join("campaign_output_log AS col", "c.id = col.campaign_id");
        $this->db->group_by("col.output_field , col.campaign_id");
        $this->db->where("c.id = " . $id . "");

        return $this->db->get();
    }

    /*--------------code by vicky for report analytics of app----------------------------*/
    public function get_user_by_date($from, $where)
    {
        $this->db->select("DATE(`login_date`) as date, count(*) as users");
        $this->db->from($from);
        $this->db->where($where);
        $this->db->group_by("DATE(`login_date`)");
        return $this->db->get();
    }

    public function get_active_user_by_date($startdate, $enddate, $from)
    {
        $this->db->select("DATE(`login_date`) as date, count(*) as users");
        $this->db->from($from);
        $this->db->group_by("DATE(`login_date`)");
        $this->db->where("login_date >= " . $startdate . "");
        $this->db->where("login_date <= " . $enddate . "");
        return $this->db->get();
    }

    public function get_user_session($from, $where)
    {
        // $this->db->select("DATE(`login_date`) as date, count(*) as users");
        $this->db->select("TIMESTAMPDIFF(SECOND,`session_start_time`,`session_end_time`) as session, login_date as date");
        $this->db->from($from);
        $this->db->where($where);
        $this->db->group_by("DATE(`login_date`)");
        //$this->db->where("login_date >= ".$startdate."");
        //$this->db->where("login_date <= ".$enddate."");
        return $this->db->get();
    }

    public function get_user_session_by_date($startdate, $enddate, $from)
    {
        // $this->db->select("DATE(`login_date`) as date, count(*) as users");
        $this->db->select("SUM(TIMESTAMPDIFF(SECOND,`session_start_time`,`session_end_time`)) as usersession, login_date as logdate");
        $this->db->from($from);
        $this->db->group_by("DATE(`login_date`)");
        $this->db->where("login_date >=", $startdate);
        $this->db->where("login_date <=", $enddate);
        return $this->db->get();
    }

    public function get_user_avg_session_by_date($startdate, $enddate, $from)
    {
        // $this->db->select("DATE(`login_date`) as date, count(*) as users");
        $this->db->select("AVG(TIMESTAMPDIFF(SECOND,`session_start_time`,`session_end_time`)) as usersession, login_date as logdate");
        $this->db->from($from);
        $this->db->group_by("DATE(`login_date`)");
        $this->db->where("login_date >=", $startdate);
        $this->db->where("login_date <=", $enddate);
        return $this->db->get();
    }

    function select_groupby_all($select, $table, $groupby, $where)

    {

        $this->db->select($select);

        $this->db->from($table);

        $this->db->where($where);

        $this->db->group_by($groupby);

        return $this->db->get();

    }

    function select_session($select, $select_as, $count, $count_as, $table, $groupby, $order_by)
    {

        $this->db->select($select);
        $this->db->from($table);
        $this->db->where("date_created >= (CURDATE() - INTERVAL 1 DAY)");
        $this->db->where("date_created <= (CURDATE() + INTERVAL 1 DAY)");
        $this->db->group_by("HOUR(`date_created`)");
        $this->db->order_by("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:00')");
        return $this->db->get();

    }

    function select_session_min($select, $select_as, $count, $count_as, $table, $groupby, $order_by)
    {

        $this->db->select($select);
        $this->db->from($table);
        $this->db->where("date_created >= (CURDATE() - INTERVAL 1 DAY)");
        $this->db->where("date_created <= (CURDATE() + INTERVAL 1 DAY)");
        $this->db->group_by("MINUTE(`date_created`)");
        //$this->db->group_by("DATE_FORMAT(`date_created`, '%H:%i')");
        $this->db->order_by("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:00')");
        return $this->db->get();

    }

    function select_active_devices($id)
    {
        $this->db->select("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:%m:%s') Createdhour, COUNT(DISTINCT uuid) AS activeDevices");
        $this->db->from("user_logs");
        $this->db->where("company_id = " . $id . "");
        $this->db->where("date_created >= (CURDATE() - INTERVAL 1 DAY)");
        $this->db->where("date_created <= (CURDATE() + INTERVAL 1 DAY)");
        $this->db->group_by("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:00')");
        return $this->db->get();
    }

    function select_active_devices_date($id)
    {
        $this->db->select("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:%m:%s') Createdhour, COUNT(DISTINCT uuid) AS activeDevices");
        $this->db->from("user_logs");
        $this->db->where("company_id = " . $id . "");
        $this->db->group_by("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:00')");
        return $this->db->get();
    }

    function select_active_devices_weekly($id)
    {
        $this->db->select("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:%m:%s') Createdhour, COUNT(DISTINCT uuid) AS activeDevices");
        $this->db->from("user_logs");
        $this->db->where("company_id = " . $id . "");
        $this->db->where("date_created >= (CURDATE() - INTERVAL 7 DAY)");
        $this->db->where("date_created <= (CURDATE() + INTERVAL 1 DAY)");
        $this->db->group_by("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:00')");
        return $this->db->get();
    }

    function select_active_devices_tm($id)
    {
        $this->db->select("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:%m:%s') Createdhour, COUNT(DISTINCT uuid) AS activeDevices");
        $this->db->from("user_logs");
        $this->db->where("company_id = " . $id . "");
        $this->db->where("date_created >= (CURDATE() - INTERVAL 80 DAY)");
        $this->db->where("date_created <= (CURDATE() + INTERVAL 1 DAY)");
        $this->db->group_by("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:00')");
        return $this->db->get();
    }

    function select_active_devices_sm($id)
    {
        $this->db->select("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:%m:%s') Createdhour, COUNT(DISTINCT uuid) AS activeDevices");
        $this->db->from("user_logs");
        $this->db->where("company_id = " . $id . "");
        $this->db->where("date_created >= (CURDATE() - INTERVAL 180 DAY)");
        $this->db->where("date_created <= (CURDATE() + INTERVAL 1 DAY)");
        $this->db->group_by("week(`date_created`)");
        return $this->db->get();
    }

    function select_active_devices_msm($id)
    {
        $this->db->select("DATE_FORMAT(`date_created`, '%Y-%m-%d %H:%m:%s') Createdhour, COUNT(DISTINCT uuid) AS activeDevices");
        $this->db->from("user_logs");
        $this->db->where("company_id = " . $id . "");
        $this->db->where("date_created >= (CURDATE() - INTERVAL 180 DAY)");
        $this->db->where("date_created <= (CURDATE() + INTERVAL 1 DAY)");
        $this->db->group_by("MONTH(`date_created`)");
        return $this->db->get();
    }

    function select_new_devices($id)
    {
        $this->db->select("DATE_FORMAT(`date_created`, '%Y-%m-%d') Createdhour, COUNT(DISTINCT uuid) AS newDevices");
        $this->db->from("user_logs");
        $this->db->where("company_id = " . $id . "");
        $this->db->group_by("DATE_FORMAT(`date_created`, '%Y-%m-%d')");
        return $this->db->get();
    }

    function select_between($select, $table, $from = '', $to = '', $betweenColoum = '', $where = '', $joins = '', $groupBY = '')
    {
        $this->db->select($select);
        $this->db->from($table);
        if ($betweenColoum != '' && $from != '' && $to != '') {
            $this->db->where('' . $betweenColoum . ' between "' . $from . '" and "' . $to . '"');
        }
        $this->db->where($where);
        if ($joins != '') {
            foreach ($joins as $join) {
                $this->db->join($join['table'], $join['condition'], $join['joinType']);
            }
        }
        if ($groupBY != '') {
            $this->db->group_by($groupBY);
        }
        return $this->db->get();
    }

    function select_between_report($select, $table, $from, $to, $betweenColoum)
    {
        $this->db->select($select);
        $this->db->from($table);
        $this->db->where('' . $betweenColoum . ' between "' . $from . '" and "' . $to . '"');
        return $this->db->get();
    }

    function select_groupby_between($select, $table, $where, $groupby, $from, $to, $betweenColoumn)
    {
        $this->db->select($select);
        $this->db->from($table);
        $this->db->where($where);
        if ($groupby != '') {
            $this->db->group_by($groupby);
        }
        $this->db->where('' . $betweenColoumn . ' between "' . $from . '" and "' . $to . '"');
        return $this->db->get();
    }


    function select_unassigned_routers()
    {
        $this->db->where('id NOT IN (SELECT device_id FROM venue_floor_devices)');
//        $this->db->where("company_id", $this->session->userdata('user_company_id'));
        return $this->db->get('hotspot_devices')->result();
    }

    function select_where_or($select,$table_name,$where,$field1,$field2,$field3,$field4,$field5,$field6,$str){
        $this->db->select($select);
        $this->db->from($table_name);
        $this->db->where($where);
        /*if ($field1!='') {
          $this->db->or_where($field1, '%'.$str.'%');
        }if ($field2!='') {
          $this->db->or_where($field2, '%'.$str.'%');
        }if ($field3!='') {
          $this->db->or_where($field3, '%'.$str.'%');
        }if ($field4!='') {
          $this->db->or_where($field4, '%'.$str.'%');
        }if ($field5!='') {
          $this->db->or_where($field5, '%'.$str.'%');
        }if ($field6!='') {
          $this->db->or_where($field6, '%'.$str.'%');
        }*/

        return $this->db->get();
    }

}

?>
